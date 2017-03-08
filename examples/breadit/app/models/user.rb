class User < ApplicationRecord
  # username
  # email

  has_many :posts
  has_many :comments
  has_many :votes
end
