class CreateCaves < ActiveRecord::Migration
  def change
    create_table :caves do |t|
      t.string :cavename
      t.string :creatures
      t.string :requirements
      t.string :coordinates
      t.string :boss
      t.string :drops

      t.timestamps null: false
    end
  end
end
