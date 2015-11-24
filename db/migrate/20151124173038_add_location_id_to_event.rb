class AddLocationIdToEvent < ActiveRecord::Migration
  def change
  	add_column :events, :location_id, :integer
  end
end
