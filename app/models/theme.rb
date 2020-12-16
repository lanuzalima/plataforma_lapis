class Theme < ApplicationRecord
  belongs_to :user
  has_many :texts
  has_one_attached :photo

  include PgSearch::Model
  pg_search_scope :global_search,
                  against: %i[title genre start_date end_date],
                  associated_against: {
                    user: %i[name cpf role email]
                  },
                  using: {
                    tsearch: { prefix: true }
                  }
end
