json.array!(@creatures) do |creature|
  json.extract! creature, :id, :creaturename, :vita, :ac, :cave_id
  json.url creature_url(creature, format: :json)
end
