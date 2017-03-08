class Vote < ApplicationRecord
  belongs_to :user
  belongs_to :post
  validates :direction, numericality: { only_integer: true }, inclusion: { in: [-1, 1] }
  validates :user, uniqueness: { scope: :post, message: "Only 1 vote may be created per user" }
end
