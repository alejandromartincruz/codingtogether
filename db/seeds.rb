# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

puts "---------- Destroying all previous data stored ----------"
User.destroy_all

puts "++++++++++ Generating new data ++++++++++"

(1..10).each do |index|
	User.create(email: Faker::Internet.email, username: Faker::Name.name, password: "12345678")
end

puts "Info: Password for all test users is 12345678"