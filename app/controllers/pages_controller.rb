require 'json'

class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home, :test, :annotations]

  def home
  end

  def test
    text_id = 1
    @text_id = mask(text_id)
    @user_id = mask(current_user.id)
    text_annotations = Annotation.where(text_id: text_id)
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
end
