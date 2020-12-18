class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user!

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[name cpf photo role])

    devise_parameter_sanitizer.permit(:account_update, keys: %i[name cpf role photo])
  end

  private

  def after_sign_in_path_for(_resource)
    themes_path
  end
end
