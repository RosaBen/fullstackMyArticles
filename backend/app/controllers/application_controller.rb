class ApplicationController < ActionController::API
  before_action :authenticate_user_from_cookie!

  private

  def authenticate_user_from_cookie!
    if cookies.signed[:jwt].present?
      begin
        token = cookies.signed[:jwt]
        decoded_token = JWT.decode(token, Rails.application.credentials.devise[:jwt_secret_key])
        user_id = decoded_token[0]['sub']
        @current_user = User.find(user_id)
      rescue JWT::DecodeError, ActiveRecord::RecordNotFound
              cookies.delete(:jwt)
        @current_user = nil
      end
    end
  end
    def current_user
    @current_user
  end

  def user_signed_in?
    current_user.present?
  end
end
