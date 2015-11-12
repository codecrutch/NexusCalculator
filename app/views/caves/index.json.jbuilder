json.array!(@caves) do |cave|
  json.extract! cave, :id, :cavename, :requirements, :coordinates, :boss, :drops
  json.url cave_url(cave, format: :json)
end
