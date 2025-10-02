class Users::RegistrationsController < Devise::RegistrationsController
  skip_before_action :verify_authenticity_token
  respond_to :json

  private

    def sign_up_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end

  def respond_with(resource, _opts = {})
    register_success && return if resource.persisted?

    register_failed
  end

  def register_success
    render json: {
      message: 'Signed up sucessfully.',
      user: current_user
    }, status: :ok
  end

def register_failed
  render json: { 
    message: 'Registration failed.', 
    errors: resource.errors.full_messages 
  }, status: :unprocessable_entity
end
end