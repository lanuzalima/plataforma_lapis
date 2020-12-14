class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :texts
  has_many :themes
  has_many :annotations

  validates_presence_of :name, :email, :password, :cpf
  validates_uniqueness_of :email, :cpf
  has_one_attached :photo
end
