class Users::SessionsController < Devise::SessionsController
  skip_before_action :verify_authenticity_token
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    render json: {
      message: 'Logged in successfully.',
      user: { id: resource.id, email: resource.email }
    }, status: :ok
  end

  def respond_to_on_destroy
    # Clear the JWT cookie
    cookies.delete(:auth_token)
    
    if current_user
      render json: { message: 'Logged out successfully.' }, status: :ok
    else
      render json: { message: 'No active session.' }, status: :unauthorized
    end
  end
end