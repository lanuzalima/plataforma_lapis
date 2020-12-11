class AnnotationsController < ApplicationController
  def create
    @annotation = Annotation.new(annotation_params)
    if @annotation.save
      puts "Annotation saved"
    else
      puts "Deu merda"
    end
  end

  private

  def annotation_params
    params.require(:annotation).permit(:original_id, :content)
  end

  def set_annotation
  end
end
