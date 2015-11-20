json.array!(@events) do |event|
  json.extract! event, :id, :title, :description, :hour, :duration, :date
  json.url event_url(event, format: :json)
end
