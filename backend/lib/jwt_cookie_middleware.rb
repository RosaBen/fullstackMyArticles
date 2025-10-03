class JwtCookieMiddleware
  def initialize(app)
    @app = app
  end

  def call(env)
    status, headers, response = @app.call(env)
    
    request = Rack::Request.new(env)
    
    # If this is a login request and there's a JWT in the Authorization header
    if request.path == '/users/sign_in' && request.post? && headers['Authorization']
      # Set the JWT as a cookie
      jwt_token = headers['Authorization']
      
      cookie_string = "auth_token=#{jwt_token}; HttpOnly; SameSite=Lax; Path=/"
      cookie_string += "; Secure" if Rails.env.production?
      cookie_string += "; Expires=#{(Time.current + 24.hours).httpdate}"
      
      # Add Set-Cookie header
      if headers['Set-Cookie']
        headers['Set-Cookie'] += "\n#{cookie_string}"
      else
        headers['Set-Cookie'] = cookie_string
      end
    end
    
    [status, headers, response]
  end
end