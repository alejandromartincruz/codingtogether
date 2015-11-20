json.array!(@locations) do |location|
  json.extract! location, :id, :latitude, :longitude, :formatted_address
  json.url location_url(location, format: :json)
end
