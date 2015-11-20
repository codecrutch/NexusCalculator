class CreateCharacters < ActiveRecord::Migration
  def change
    create_table :characters do |t|
      t.string :path
      t.string :subpath
      t.string :name
      t.integer :vita
      t.integer :mana
      t.integer :might
      t.integer :will
      t.integer :grace
      t.string :alignment
      t.string :title
      t.string :clan
      t.string :clantitle
      t.string :imagelocation
      t.integer :user_id

      t.timestamps
    end
  end
end
