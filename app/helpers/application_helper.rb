# ===========================================================================
# Copyright 2015 Alejandro Martin Cruz
# 
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# ===========================================================================

module ApplicationHelper

	def headerLogin

		if user_signed_in?
			"You are logged as " + current_user.username + " - " + link_to('Close session', destroy_user_session_path, method: 'DELETE')
		else
			link_to("Log in", new_user_session_path) + " or " + link_to("Register", new_user_registration_path)
		end
	end

	def tag_cloud(tags, classes)
		max = tags.sort_by(&:count).last
		tags.each do |tag|
			index = tag.count.to_f / max.count * (classes.size -1)
			#yield (tag, classes[index.round])
		end
	end

end
