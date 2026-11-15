puts "Criando usuários de demonstração..."

user1 = User.find_or_create_by!(email: "demo@pulse.app") do |u|
  u.name = "Demo Chaos"
  u.username = "demochaos"
  u.password = "123456"
  u.password_confirmation = "123456"
  u.bio = "Usuário demo com plano Chaos ativado 🔥"
  u.subscription_type = :chaos
end

user2 = User.find_or_create_by!(email: "luna@pulse.app") do |u|
  u.name = "Luna"
  u.username = "luna"
  u.password = "123456"
  u.password_confirmation = "123456"
  u.bio = "Explorando o universo Pulse"
end

user3 = User.find_or_create_by!(email: "max@pulse.app") do |u|
  u.name = "Max"
  u.username = "maxdev"
  u.password = "123456"
  u.password_confirmation = "123456"
  u.bio = "Dev e criador de conteúdo"
end

puts "Usuários criados."

# Seguir uns aos outros
user1.follow(user2)
user1.follow(user3)
user2.follow(user1)
user3.follow(user1)

# Posts de exemplo
if Post.count.zero?
  Post.create!([
    { user: user1, content: "Primeiro post no Pulse! Quem mais tá animado com essa rede? ⚡" },
    { user: user2, content: "Acabei de descobrir o tema Chaos... tá muito insano 🔥" },
    { user: user3, content: "Construindo coisas interessantes por aqui. Alguém mais dev?" },
    { user: user1, content: "Dica do dia: foque no processo, o resultado vem." },
    { user: user2, content: "Alguém recomenda um bom café pra programar de madrugada?" }
  ])
end

# Alguns likes e comentários
post1 = Post.first
if post1 && post1.likes.count.zero?
  post1.likes.create!(user: user2)
  post1.likes.create!(user: user3)
  post1.comments.create!(user: user2, content: "Boraaa! 🚀")
  post1.comments.create!(user: user3, content: "Tô junto!")
end

puts "Seeds finalizados!"
puts "Login demo: demo@pulse.app / 123456 (plano Chaos)"
