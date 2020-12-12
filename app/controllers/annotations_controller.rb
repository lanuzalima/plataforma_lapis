class AnnotationsController < ApplicationController
  before_action :set_annotation, except: %i[create]

  def create
    @annotation = Annotation.new(annotation_params)
    if @annotation.save
      puts "Annotation saved"
    else
      puts "Deu merda"
    end
  end

  def update_by_original
    @annotation.update(annotation_params)
  end

  def del_by_original
    @annotation.destroy
  end

  private

  def annotation_params
    params.require(:annotation).permit(:original_id, :content, :text_id)
  end

  def set_annotation
    @annotation = Annotation.where(original_id: params[:annotation][:original_id]).limit(1)[0]
  end
end
