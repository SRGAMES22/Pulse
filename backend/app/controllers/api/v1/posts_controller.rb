module Api
  module V1
    class PostsController < ApplicationController
      def index
        posts = Post.includes(:user, :likes, :comments).order(created_at: :desc).limit(50)
        render json: posts.map { |p| post_response(p) }
      end

      def feed
        following_ids = current_user.following.pluck(:id) + [current_user.id]
        posts = Post.where(user_id: following_ids)
                    .includes(:user, :likes, :comments)
                    .order(created_at: :desc)
                    .limit(50)

        render json: posts.map { |p| post_response(p) }
      end

      def create
        post = current_user.posts.build(post_params)

        if post.save
          render json: post_response(post), status: :created
        else
          render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def show
        post = Post.includes(:user, :likes, :comments).find(params[:id])
        render json: post_response(post)
      end

      def destroy
        post = current_user.posts.find(params[:id])
        post.destroy
        head :no_content
      end

      def like
        post = Post.find(params[:id])
        like = post.likes.find_or_create_by(user: current_user)
        render json: { liked: true, likes_count: post.likes.count }
      end

      def unlike
        post = Post.find(params[:id])
        post.likes.where(user: current_user).destroy_all
        render json: { liked: false, likes_count: post.likes.count }
      end

      private

      def post_params
        params.permit(:content)
      end

      def post_response(post)
        {
          id: post.id,
          content: post.content,
          created_at: post.created_at,
          user: {
            id: post.user.id,
            name: post.user.name,
            username: post.user.username,
            avatar_url: post.user.avatar_url
          },
          likes_count: post.likes.size,
          comments_count: post.comments.size,
          liked_by_me: post.liked_by?(current_user)
        }
      end
    end
  end
end
