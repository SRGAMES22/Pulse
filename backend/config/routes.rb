Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post "auth/login",    to: "auth#login"
      post "auth/register", to: "auth#register"
      get  "auth/me",       to: "auth#me"

      resources :posts, only: [:index, :create, :show, :destroy] do
        resources :comments, only: [:index, :create, :destroy]
        member do
          post   :like
          delete :unlike
        end
      end

      resources :users, only: [:show] do
        member do
          post   :follow
          delete :unfollow
          get    :followers
          get    :following
        end
      end

      get "feed", to: "posts#feed"
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
