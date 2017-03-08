class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token

  helper_method :current_user

  def current_user
    @current_user ||= User.first
  end
end
