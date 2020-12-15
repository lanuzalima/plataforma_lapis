class ThemesController < ApplicationController
  before_action :set_theme, only: %i[show destroy update]

  def index
    if current_user.role == "Professor" || current_user.role == "Teacher"
      @themes = Theme.where(user_id: current_user.id)
    else
      @themes = Theme.all
    end
  end

  def new
    @theme = Theme.new
  end

  def create
    @theme = Theme.new(theme_params)
    @theme.user = current_user

    if @theme.save
      redirect_to theme_path(@theme)
    else
      render 'new'
    end
  end

  def show
  end

  def edit
    @theme = Theme.find(params[:id])
  end

  def update
    @theme.update(theme_params)
    redirect_to theme_path(@theme),
                notice: "Sua proposta foi editada"
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
