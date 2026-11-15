module Api
  module V1
    class AuthController < ApplicationController
      skip_before_action :authenticate_request, only: [:login, :register]

      def register
        user = User.new(user_params)

        if user.save
          token = JwtService.encode(user_id: user.id)
          render json: { user: user_response(user), token: token }, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def login
        user = User.find_by(email: params[:email]) || User.find_by(username: params[:email])

        if user&.authenticate(params[:password])
          token = JwtService.encode(user_id: user.id)
          render json: { user: user_response(user), token: token }
        else
          render json: { error: "Credenciais inválidas" }, status: :unauthorized
        end
      end

      def me
        render json: { user: user_response(current_user) }
      end

      private

      def user_params
        params.permit(:name, :username, :email, :password, :password_confirmation, :bio)
      end

      def user_response(user)
        {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          bio: user.bio,
          avatar_url: user.avatar_url,
          subscription_type: user.subscription_type,
          followers_count: user.followers.count,
          following_count: user.following.count
        }
      end
    end
  end
end
