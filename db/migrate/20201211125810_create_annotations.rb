class CreateAnnotations < ActiveRecord::Migration[6.0]
  def change
    create_table :annotations do |t|
      t.text :original_id
      t.text :content

      t.timestamps
    end
  end
end
