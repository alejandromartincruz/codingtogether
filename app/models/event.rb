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

class Event < ActiveRecord::Base
	belongs_to :user
	belongs_to :location
	
	has_many :taggings
	has_many :tags, through: :taggings


	def self.tagged_with(name)
		Tag.find_by_name!(name).events
	end

	def self.tag_counts
		Tag.select("tags.*, count(taggings.tag_id) as count").
		  joins(:taggings).group("taggings.tag_id")
	end

	def all_tags=(names)
	  self.tags = names.split(",").map do |name|
	      Tag.where(name: name.strip).first_or_create!
	  end
	end

	def all_tags
	  self.tags.map(&:name).join(", ")
	end

end
