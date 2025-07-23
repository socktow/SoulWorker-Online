# SoulWorker-Online

A modern web platform for SoulWorker Online, providing account management, game tools, news, forum, and a powerful admin dashboard.

---

## 🌟 Features

### 🧑‍💻 Player Side

- **Authentication**
  - Sign Up / Sign In with Email
  - Email-based OTP verification (with Redis)
  - Password reset and change
- **Account Management**
  - Personal dashboard with charge history
  - Giftcode redemption
  - Profile avatar management
- **Game Tools**
  - Game client download
  - IP block checker
- **Forum**
  - Post, reply, and moderate topics
  - Category browsing
  - Admin announcements
- **News**
  - Latest updates and events

### 🛡️ Admin Panel

- **Dashboard Modules**
  - Announcements
  - Server status & version control
  - Giftcode generation
  - User & account management
  - IP blocking
  - Payment management
  - Webshop product control
  - Lottery system
  - Forum moderation

---

## 🏗️ Project Structure

```
src/
  app/
    (site)/         # Main user-facing pages (auth, forum, dashboard, news, etc.)
    (admin)/        # Admin dashboard and modules
    api/            # Next.js API routes (public, user, admin)
  lib/
    auth/           # Auth logic (client/server helpers)
    mongodb.js      # MongoDB connection
    redis.js        # Redis connection
  models/           # Mongoose models (User, Forum, Comment, etc.)
  components/       # Shared UI components (navbar, footer, etc.)
  layout/           # Layout components
```

---

## 🛠️ Tech Stack

| Layer       | Tech                        |
|-------------|-----------------------------|
| Frontend    | Next.js 14 (App Router)     |
| Styling     | Tailwind CSS                |
| Animation   | Framer Motion               |
| Backend     | Next.js API Routes          |
| Database    | MongoDB (Mongoose models)   |
| Cache/OTP   | Redis (Upstash)             |
| Auth        | JWT + Email OTP             |
| Hosting     | cPanel (with SSH Git Deploy)|

---

## 🔌 API Overview

- **/api/public/auth/signup/**
  - `check-email` — Check if email is registered
  - `sendotp` — Send OTP to email
  - `verify` — Verify OTP
  - `register` — Register new user
- **/api/public/auth/signin/** — User login
- **/api/public/forum/allpost/** — List all forum posts
- **/api/public/forum/allpost/[slug]/** — Get post details
- **/api/public/forum/** — Forum endpoints
- **/api/public/payment/** — Payment endpoints

---

## 🧪 Local Development

### 1. Clone & Install

```bash
git clone https://github.com/socktow/SoulWorker-Online.git
cd SoulWorker-Online
npm install
```

### 2. Environment Variables

Create a `.env.local` file with:

```
MONGODB_URI=your_mongodb_uri
REDIS_URL=your_redis_url
JWT_SECRET=your_jwt_secret
VERCEL_SEND_OTP_URL=your_mail_server_url
MAIL_API_SECRET=your_mail_secret
```

### 3. Run Dev Server

```bash
npm run dev
```

---

## 📁 Notable Folders

- `src/app/(site)/(auth)/signup/components/` — Multi-stage signup flow (email, OTP, register)
- `src/app/(site)/forum/` — Forum UI and logic
- `src/app/(admin)/` — Admin dashboard
- `src/lib/auth/client/` — Client-side auth helpers
- `src/models/` — Mongoose models

---

## 🤝 Contributing

Pull requests and suggestions are welcome! Please open an issue first to discuss changes.

---

## 📜 License

MIT

---

If you want to add more details (e.g. screenshots, deployment, or usage instructions), let me know!
