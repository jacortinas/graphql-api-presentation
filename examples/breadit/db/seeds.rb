authors = 10.times.map do |i|
  User.create({
    username: Faker::Internet.user_name,
    email: Faker::Internet.safe_email
  })
end


40.times do |i|
  Post.create({
    title: Faker::Hacker.say_something_smart,
    description: Faker::Hipster.paragraph,
    url: Faker::Internet.url,
    user: authors.sample
  })
end
