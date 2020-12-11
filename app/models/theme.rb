class Theme < ApplicationRecord
  belongs_to :user
  has_many :texts
end
