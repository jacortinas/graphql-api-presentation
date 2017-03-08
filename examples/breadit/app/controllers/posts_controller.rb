class PostsController < ApplicationController
  def index
    @posts = Post.includes(:user).all
  end

  def show
    @post = Post.find(params[:id])
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(params[:post])

    if @post.save
      redirect_to @post
    else
      render :new
    end
  end

  def upvote
    @post = Post.find(params[:id])
    @post.upvote(current_user)
    render :show
  end

  def downvote
    @post = Post.find(params[:id])
    @post.downvote(current_user)
    render :show
  end
end
