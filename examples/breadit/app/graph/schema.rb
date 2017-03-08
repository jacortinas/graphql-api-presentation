# Query Types
UserType = GraphQL::ObjectType.define do
  name "User"
  description "A User"
  field :id, !types.ID
  field :username, !types.String
  field :posts, types[PostType]
  field :comments, types[CommentType]
end

PostType = GraphQL::ObjectType.define do
  name "Post"
  description "An awesome post"
  field :id, !types.ID
  field :title, !types.String
  field :url, !types.String
  field :description, !types.String
  field :score, !types.Int
  field :author do
    type !UserType
    resolve -> (obj, args, ctx) { obj.user }
  end
  field :comments do
    type types[CommentType]
    resolve -> (obj, args, ctx) { obj.comments }
  end
end

CommentType = GraphQL::ObjectType.define do
  name "Comment"
  description "A post comment"
  field :id, !types.ID
  field :body, !types.String
  field :post do
    type !PostType
    resolve -> (obj, args, ctx) { obj.post }
  end
  field :author do
    type !UserType
    resolve -> (obj, args, ctx) { obj.user }
  end
end

QueryRoot = GraphQL::ObjectType.define do
  name "Query"
  description "The query root for this schema"

  field :posts, types[PostType] do
    argument :limit, types.Int
    argument :offset, types.Int
    resolve ->(obj, args, ctx) {
      limit = args[:limit] || 20
      offset = args[:offset] || 0
      Post.limit(limit).offset(offset)
    }
  end

  field :post, PostType do
    argument :id, !types.ID
    resolve -> (obj, args, ctx) {
      Post.find(args[:id])
    }
  end

  field :user, UserType do
    argument :username, !types.String
    resolve -> (obj, args, ctx) {
      User.find_by(username: args[:username])
    }
  end
end

# Mutation types

PostInputType = GraphQL::InputObjectType.define do
  name "PostInputType"
  description "Properties for creating a post."

  argument :title, !types.String do
    description "Title of post"
  end

  argument :url, !types.String do
    description "URL for the post"
  end

  argument :description, !types.String do
    description "Description text for the post"
  end
end

MutationRoot = GraphQL::ObjectType.define do
  name "Mutation"

  field :addPost, PostType do
    description "Adds a new post."
    argument :post, PostInputType
    resolve -> (obj, args, ctx) {
      title = args[:post][:title]
      url = args[:post][:url]
      description = args[:post][:description]
      user = ctx[:current_user]
      user.posts.create({
        title: title,
        url: url,
        description: description
      })
    }
  end

  field :upVotePost, PostType do
    description "Upvotes a post."
    argument :id, !types.ID
    resolve -> (obj, args, ctx) {
      post = Post.find(args[:id])
      post.upvote(ctx[:current_user])
      post
    }
  end

  field :downVotePost, PostType do
    description "Downvotes a post."
    argument :id, !types.ID
    resolve -> (obj, args, ctx) {
      post = Post.find(args[:id])
      post.downvote(ctx[:current_user])
      post
    }
  end
end

Schema = GraphQL::Schema.define do
  query QueryRoot
  mutation MutationRoot
end
