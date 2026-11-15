class Post < ApplicationRecord
  belongs_to :user
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :liked_users, through: :likes, source: :user

  validates :content, presence: true, length: { maximum: 1000 }

  # Active Storage para imagens (opcional)
  has_one_attached :image

  def liked_by?(user)
    likes.exists?(user_id: user.id)
  end
end
