class RemoveCreaturesFromCaves < ActiveRecord::Migration
  def change
    remove_column :caves, :creatures, :string
  end
end
