class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception, unless: -> { request.format.json? }
  respond_to :json

  private

  def authenticate_user!
    unless user_signed_in?
      render json: { error: 'Authentication required' }, status: :unauthorized
    end
  end
end