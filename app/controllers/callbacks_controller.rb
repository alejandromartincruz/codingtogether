class CallbacksController < Devise::OmniauthCallbacksController
    def twitter
    	
	    @user = User.from_omniauth(request.env["omniauth.auth"])
	    if @user.persisted?
	        sign_in_and_redirect @user
	    else
	    	user={provider: "", uid: "", email: "", username: "", password: ""}
	    	twitterUserInfo = request.env["omniauth.auth"]

		      user[:provider] = twitterUserInfo.provider
	          user[:uid] = twitterUserInfo.uid
	          user[:email] = twitterUserInfo.info.email
	          user[:username] = twitterUserInfo.info.name
	          user[:password] = Devise.friendly_token[0,20]
      		session["devise.twitter_data"] = user
      		sign_in_and_redirect @user
	    end
    end
end