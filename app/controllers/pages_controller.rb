class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home, :test, :annotations]

  def home
  end

  def test
    @text_id_1 = '1'
    @text_id_2 = '2'
    text_annotations = Annotation.where(text_id: @text_id)
    if text_annotations.length.positive?
      mount_annotations(text_annotations)
    else
      @annotations = nil
    end
  end

  private

  def mount_annotations(text_annotations)
    @annotations = {}
    text_annotations.each do |anno|
      @annotations[anno.id] = {}
      @annotations[anno.id][:original_id] = anno.original_id
      @annotations[anno.id][:content] = anno.content
      @annotations[anno.id][:content] = anno.text_id
    end
    @annotations
  end
end

# @mask_id = "##{current_user.name[0..3]}-#{(current_user.id + 7) * 13}-#{current_user.email[0]}#{(current_user.email.length + 52) * 23}"