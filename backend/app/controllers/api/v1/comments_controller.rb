module Api
  module V1
    class CommentsController < ApplicationController
      def index
        post = Post.find(params[:post_id])
        comments = post.comments.includes(:user).order(created_at: :asc)

        render json: comments.map { |c|
          {
            id: c.id,
            content: c.content,
            created_at: c.created_at,
            user: {
              id: c.user.id,
              name: c.user.name,
              username: c.user.username
            }
          }
        }
      end

      def create
        post = Post.find(params[:post_id])
        comment = post.comments.build(content: params[:content], user: current_user)

        if comment.save
          render json: {
            id: comment.id,
            content: comment.content,
            created_at: comment.created_at,
            user: {
              id: current_user.id,
              name: current_user.name,
              username: current_user.username
            }
          }, status: :created
        else
          render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        comment = current_user.comments.find(params[:id])
        comment.destroy
        head :no_content
      end
    end
  end
end
