class AddTextToAnnotations < ActiveRecord::Migration[6.0]
  def change
    add_reference :annotations, :text, null: false, foreign_key: true
    
  end
end
