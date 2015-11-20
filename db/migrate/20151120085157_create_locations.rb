class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.float :latitude
      t.float :longitude
      t.string :formatted_address
      t.belongs_to :event, index: true

      t.timestamps null: false
    end
  end
end
