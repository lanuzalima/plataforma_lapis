class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home, :test, :annotations]

  def home
  end

  def test
    get_annos = Annotation.all
    @annotations = {}
    get_annos.each do |anno|
      @annotations[anno.id] = {}
      @annotations[anno.id][:original_id] = anno.original_id
      @annotations[anno.id][:content] = anno.content
    end
  end
end
