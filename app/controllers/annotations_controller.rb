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

  def update
  end

  def destroy
    @annotation.destroy
  end

  private

  def annotation_params
    params.require(:annotation).permit(:original_id, :content)
  end

  def set_annotation
    @annotation = Annotation.find(params[:id])
  end
end
