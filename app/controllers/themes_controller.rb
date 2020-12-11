class ThemesController < ApplicationController
  before_action :set_theme, only: [:show]

  def index
    @themes = Theme.where(user_id: current_user.id)
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

  #   def edit
  #     @theme = Theme.find(params[:id])
  #   end

  #   def update
  #     @theme.update(theme_params)
  #     redirect_to theme_path(@theme)
  #   end
  private

  def set_theme
    @theme = Theme.find(params[:id])
  end

  def theme_params
    params.require(:theme).permit(:genre, :title, :start_date, :end_date)
  end
end
