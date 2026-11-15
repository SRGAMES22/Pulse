class CreateUsers < ActiveRecord::Migration[7.2]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :username, null: false
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :bio
      t.string :avatar_url
      t.integer :subscription_type, default: 0, null: false

      t.timestamps
    end

    add_index :users, :email, unique: true
    add_index :users, :username, unique: true
  end
end
