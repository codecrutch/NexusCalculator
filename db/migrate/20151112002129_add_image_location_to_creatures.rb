class AddImageLocationToCreatures < ActiveRecord::Migration
  def change
    add_column :creatures, :imagelocation, :string
  end
end
