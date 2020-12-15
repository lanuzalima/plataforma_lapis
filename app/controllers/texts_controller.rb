class TextsController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[new create show]
  before_action :set_text, only: %i[show]

  def index
    @texts = Text.where(user_id: current_user.id)
  end

  def show
    # authorize @text
    @text_id = mask(@text.id)
    @owner_id = mask(@text.user.id)
    text_annotations = Annotation.where(text_id: @text.id)
    if text_annotations.length.positive?
      mount_annotations(text_annotations)
    else
      @annotations = nil
    end
  end

  # create não está salvando
  def create
    @theme = Theme.find(params[:theme_id])	
    @text = Text.new(text_params)	    
    if @text.user == current_user
      @text.grade = nil
    end
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

  def mount_annotations(text_annotations)
    @annotations = {}
    text_annotations.each do |anno|
      @annotations[anno.id] = {}
      @annotations[anno.id][:original_id] = anno.original_id
      @annotations[anno.id][:user_id] = mask(anno.user_id)
      @annotations[anno.id][:content] = anno.content
      @annotations[anno.id][:parsed] = JSON.parse(anno.content)
    end
    @annotations
  end

  def mask(id)
    num = rand(1..100)
    "##{(num + 5) * 31}-#{((id + 7) * 13) + num}"
  end

  def set_text
    @text = Text.find(params[:id])
  end

  def text_params
    params.require(:text).permit(:grade, :photo)
  end
end
