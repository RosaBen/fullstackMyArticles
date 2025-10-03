class ApplicationController < ActionController::Base
  # Protection CSRF de Rails pour les requêtes JSON avec null_session
  protect_from_forgery with: :null_session, if: :json_request?
  respond_to :json
  
  before_action :authenticate_user_from_jwt

  private

  def json_request?
    request.format.json?
  end

  def authenticate_user!
    unless user_signed_in?
      render json: { error: 'Authentication required' }, status: :unauthorized
    end
  end

  def authenticate_user_from_jwt
    token = jwt_token
    return unless token
    
    begin
      jwt_payload = JWT.decode(token, Rails.application.credentials.dig(:devise, :jwt_secret_key)).first
      @current_user_id = jwt_payload['sub']
    rescue JWT::ExpiredSignature, JWT::VerificationError, JWT::DecodeError => e
      Rails.logger.debug "JWT Error: #{e.message}"
    end
  end

  def jwt_token
    # Récupérer le JWT depuis les cookies (priorité) ou Authorization header (fallback)
    token_from_cookie = cookies['auth_token']
    
    # Si on a un token dans les cookies, nettoyer le préfixe 'Bearer ' s'il existe
    if token_from_cookie
      return token_from_cookie.start_with?('Bearer ') ? token_from_cookie.split(' ').last : token_from_cookie
    end
    
    # Fallback: Authorization header
    auth_header = request.headers['Authorization']
    return nil unless auth_header
    auth_header.split(' ').last if auth_header.start_with?('Bearer ')
  end

  def current_user
    @current_user ||= User.find(@current_user_id) if @current_user_id
  end

  def user_signed_in?
    !!current_user
  end
end