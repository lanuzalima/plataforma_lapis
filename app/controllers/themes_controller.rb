class ThemesController < ApplicationController
  before_action :set_theme, only: %i[show destroy update edit]

  def index
    if current_user.role == "Professor" || current_user.role == "Teacher"
      @themes = Theme.where(user_id: current_user.id)
      @theme = Theme.new
      @themes = Theme.global_search("%#{params[:query]}%") if params[:query].present?
    else
      @themes = Theme.all
    end
  end

  def new
    if current_user.role == "Professor" || current_user.role == "Teacher"
      @theme = Theme.new
    else
      # flash[:alert] = "Apenas professores podem cadastrar propostas"
      redirect_to themes_path, alert: "Apenas professores podem cadastrar propostas"
    end
  end

  def create
    @theme = Theme.new(theme_params)
    @theme.user = current_user

    if @theme.start_date >= Date.today && @theme.save
      redirect_to theme_path(@theme)
    else
      flash.now[:alert] = 'Data não pode ser inferior à atual'
      render 'new'
    end
    # if @theme.save
    #   redirect_to theme_path(@theme)
    # else
    #   render 'new'
    # end
  end

  def show
  end

  def edit
  end

  def update
    @theme.update(theme_params)
    redirect_to theme_path(@theme),
                alert: "Sua proposta foi editada"
  end

  def destroy
    if @theme.texts.present?
      flash.now[:alert] = "Não é possível apagar, seus alunos já enviaram textos"
      render 'show'
    else
      @theme.destroy
      redirect_to themes_path
    end
  end

  private

  def set_theme
    @theme = Theme.find(params[:id])
  end

  def theme_params
    params.require(:theme).permit(:genre, :title, :start_date, :end_date, :photo, :role)
  end
end
