class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :title
      t.text :description
      t.time :hour
      t.integer :duration
      t.date :date
      t.belongs_to :user, index: true

      t.timestamps null: false
    end
  end
end
