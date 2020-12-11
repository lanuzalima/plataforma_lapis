class TextsController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[new create show]
  before_action :set_text, only: %i[show]

  def index
    @texts = Text.where(user_id: current_user.id)
  end

  def show
    # authorize @text
  end

  def create
    @text = Text.new(text_params)
    if @text.user == current_user
      @theme.text = @text
    else
      redirect_to themes_path
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
    params.require(:text).permit(:grade)
  end
end
