class MembersController < ApplicationController
  before_action :authenticate_user!

  def show
    if current_user
      render json: { user: { id: current_user.id, email: current_user.email } }
    else
      render json: { error: 'Not authenticated' }, status: :unauthorized
    end
  end

  private

  def get_user_from_token
    jwt_payload = JWT.decode(request.headers['Authorization'].split(' ')[1],
                             Rails.application.credentials.devise[:jwt_secret_key]).first
    user_id = jwt_payload['sub']
    User.find(user_id.to_s)
  end
end