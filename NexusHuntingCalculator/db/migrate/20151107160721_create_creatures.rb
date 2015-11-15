class CreateCreatures < ActiveRecord::Migration
  def change
    create_table :creatures do |t|
      t.string :creaturename
      t.integer :vita
      t.integer :ac
      t.integer :cave_id

      t.timestamps null: false
    end
  end
end
