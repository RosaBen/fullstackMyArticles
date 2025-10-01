class Users::SessionsController < Devise::SessionsController
  respond_to :json
  skip_before_action :authenticate_user_from_cookie!, only: [:create]

  def create
    user = User.find_by(email: params[:user][:email])
    if user&.valid_password?(params[:user][:password])
      payload = { sub: user.id, exp: 24.hours.from_now.to_i }
      token = JWT.encode(payload, Rails.application.credentials.devise[:jwt_secret_key])


     cookies.signed[:jwt] = {
        value: token,
        httponly: true,
        secure: Rails.env.production?,
        same_site: :lax,
        expires: 24.hours.from_now
      }

      render json: { 
                user: { id: user.id, email: user.email },
        message: 'Logged in successfully'
      }
    else
      render json: { error: "Invalid credentials" }, status: :unauthorized
    end
  end

  def destroy
    cookies.delete(:jwt, {
      httponly: true,
      secure: Rails.env.production?,
      same_site: :lax
    })
    render json: { message: 'Logged out successfully' }
  end

  private

  def respond_with(_resource, _opts = {})
    render json: {
      message: 'You are logged in.',
      user: current_user
    }, status: :ok
  end


  def respond_to_on_destroy
    log_out_success && return if current_user

    log_out_failure
  end

  def log_out_success
    render json: { message: 'You are logged out.' }, status: :ok
  end

  def log_out_failure
    render json: { message: 'Hmm nothing happened.' }, status: :unauthorized
  end
end