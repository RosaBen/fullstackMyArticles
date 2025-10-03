class Users::RegistrationsController < Devise::RegistrationsController
  skip_before_action :verify_authenticity_token
  respond_to :json

  private

    def sign_up_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end

  def respond_with(resource, _opts = {})
    register_success && return if resource.persisted?

    register_failed(resource)
  end

  def register_success
    render json: {
      message: 'Signed up successfully.',
      user: current_user
    }, status: :ok
  end

  def register_failed(resource)
    render json: { 
      message: 'Registration failed.', 
      errors: resource.errors.full_messages 
    }, status: :unprocessable_entity
  end
end