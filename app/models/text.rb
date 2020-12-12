class Text < ApplicationRecord
  belongs_to :user
  belongs_to :theme
  has_one_attached :photo
  has_many :annotations
end
