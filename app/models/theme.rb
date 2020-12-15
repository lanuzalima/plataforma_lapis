class Theme < ApplicationRecord
  belongs_to :user
  has_many :texts
  has_one_attached :photo
end
