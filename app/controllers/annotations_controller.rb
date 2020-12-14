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
    params[:annotation][:user_id] = unmask(params[:annotation][:user_id])
    params[:annotation][:text_id] = unmask(params[:annotation][:text_id])
    params.require(:annotation).permit(:original_id, :text_id, :user_id, :content)
  end

  def set_annotation
    @annotation = Annotation.where(original_id: params[:annotation][:original_id]).limit(1)[0]
  end

  def unmask(id)
    num = (id.split("-")[0].delete("#").to_i / 31) - 5
    (((id.split("-")[1].to_i - num) / 13) - 7)
  end
end
