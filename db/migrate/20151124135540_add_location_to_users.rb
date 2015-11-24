class AddLocationToUsers < ActiveRecord::Migration
  def change
  	add_column :events, :latitude, :float
  	add_column :events, :longitude, :float
  	add_column :events, :formatted_addres, :string
  end
end
