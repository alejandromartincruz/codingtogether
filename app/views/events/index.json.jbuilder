json.array!(@events) do |event|
  json.extract! event, :id, :title, :description, :hour, :duration, :date, :user_id, :latitude, :longitude, :formatted_addres
  json.tags event.tags
  json.username event.user.username
  json.edit_url edit_event_url(event, format: :html)
end
