module ApplicationHelper

	def headerLogin

		if user_signed_in?
			"You are logged as " + current_user.username + " - " + link_to('Close session', destroy_user_session_path, method: 'DELETE')
		else
			link_to("Log in", new_user_session_path) + " or " + link_to("Register", new_user_registration_path)
		end
	end

end
