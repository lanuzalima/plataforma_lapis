class TextsController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[new create show]
  before_action :set_text, only: %i[show]

  def index
    @texts = Text.all
  end

  def show
    # authorize @text
    @user = @text.user
    @theme = @text.theme
  end

  def create
    @text = Text.new(text_params)
    # authorize @lecture
    @text.user = current_user

    if @text.save
      redirect_to text_path(@text)
    else
      render 'new'
    end
  end

  def new
    @text = Text.new
  end

  private

  def set_text
    @text = Text.find(params[:id])
  end

  def text_params
    params.require(:text).permit(:user_id, :theme_id, :grade)
  end
end
