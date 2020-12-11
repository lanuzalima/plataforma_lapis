class ThemesController < ApplicationController


    class ThemesController < ApplicationController
  def index
    @themes = Theme.all
  end

  def new
    @theme = Theme.new
  end

  def create
    @theme = Theme.new(theme_params)
    if @theme.save
      redirect_to theme_path(@theme)
    else
      render 'new'
    end
  end

  def show
    @theme = Theme.find(params[:id])
  end

  def edit
    @theme = Theme.find(params[:id])
  end

  def update
    @theme.update(theme_params)
    redirect_to theme_path(@theme)
  end

  def theme_params
    params.require(:theme).permit(:genre, :title, :start_date, :end_date)
  end
end
end
