Rails.application.routes.draw do

  mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graph'
  match '/graph', via: %i(get post), to: 'graph#query'

  resources :users, only: :show

  resources :posts, only: :show do
    member do
      post :upvote
      post :downvote
    end
  end

  root to: 'posts#index'
end
