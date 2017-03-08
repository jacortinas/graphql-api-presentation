json.(post, :id, :title, :description, :score)
json.user do
  json.partial! 'users/user', user: post.user
end
