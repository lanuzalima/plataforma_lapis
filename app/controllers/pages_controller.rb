class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home, :test, :annotations]

  def home
  end

  def test
  end
end
