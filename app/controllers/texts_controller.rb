class TextsController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[new create show]
  before_action :set_text, only: %i[show]

  def index
    @texts = Text.where(user_id: current_user.id)
  end

  def show
    # authorize @text
    @theme = Theme.find(params[:theme_id])
  end

  # create não está salvando
  def create
    @theme = Theme.find(params[:theme_id])	
    @text = Text.new(text_params)	    
      if @text.user == current_user
    @text.grade = nil	

    if @text.save	
      redirect_to theme_text_path(@theme, @text)	
    else
      render 'new'
    end
  end

  def new
    @theme = Theme.find(params[:theme_id])
    @text = Text.new
  end

  private

  def set_text
    @text = Text.find(params[:id])
  end

  def text_params
    params.require(:text).permit(:grade, :photo)
  end
end
