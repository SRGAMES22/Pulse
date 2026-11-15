# Pulse ⚡

**Rede Social de Nicho Full Stack**  
Feed, posts, likes, comentários e sistema de seguidores.

[![GitHub](https://img.shields.io/badge/GitHub-SRGAMES22%2FPulse-blue?logo=github)](https://github.com/SRGAMES22/Pulse)

---

## Stack

| Camada     | Tecnologia                              |
|------------|-----------------------------------------|
| Backend    | Ruby on Rails 7.2 (API) + PostgreSQL + JWT |
| Web        | Next.js 14 (App Router) + Tailwind CSS  |
| Mobile     | React Native (Expo) + NativeWind        |
| Temas      | Light / Dark / **Chaos** (pago)         |

---

## Funcionalidades

- Autenticação JWT
- Feed personalizado (posts de quem você segue + seus)
- Criar posts
- Likes e contagem de comentários
- Sistema de seguidores (models + endpoints)
- Perfis de usuário
- **3 Temas**:
  - Light
  - Dark
  - **Chaos** (exclusivo do plano pago) — vermelho Deadpool + dourado Wolverine

---

## Como rodar

### Backend
```bash
cd backend
bundle install
rails db:create db:migrate db:seed
rails s -p 3000
```

**Usuário demo:**  
`demo@pulse.app` / `123456` (já vem com plano **Chaos**)

### Web (Next.js)
```bash
cd web
npm install
npm run dev
```
Acesse: http://localhost:3001 (ou a porta que o Next usar)

### Mobile
```bash
cd mobile
npm install
npx expo start
```

---

## Status

✅ Backend completo (Auth, Posts, Likes, Comments, Follows, Feed)  
✅ Web (Next.js) com Login + Feed + criar post + likes + Theme Switcher  
✅ Mobile com Login + Feed + criar post + temas  
✅ Tema **Chaos** exclusivo para plano pago  
✅ Seeds com 3 usuários e posts de exemplo  

---

Feito por **[SRGAMES22](https://github.com/SRGAMES22)**
