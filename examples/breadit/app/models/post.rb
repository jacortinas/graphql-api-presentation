class Post < ApplicationRecord
  belongs_to :user
  has_many :comments
  has_many :votes

  def score
    votes.pluck(:direction).sum
  end

  def upvote(user)
    votes.where(user_id: user.id).delete_all
    votes.create(user_id: user.id, direction: 1)
  end

  def downvote(user)
    votes.where(user_id: user.id).delete_all
    votes.create(user_id: user.id, direction: -1)
  end
end
