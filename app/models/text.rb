class Text < ApplicationRecord
  belongs_to :user
  belongs_to :theme
  has_one_attached :photo
end
