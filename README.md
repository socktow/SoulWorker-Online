# SoulWorker-Online

A web-based platform for SoulWorker Online — providing account management, game client tools, admin dashboard, news updates, giftcodes, forum, and more.

## 🌐 Features

### ✅ Player Side
- **User Authentication**
  - Sign In / Sign Up with Email
  - Email-based OTP verification (via Redis)
  - Password change/reset
- **Account Management**
  - Personal dashboard
  - Charge history
  - Giftcode redemption
  - Profile avatar
- **Game Tools**
  - Client download
  - IP block checker
- **Forum**
  - Post, reply, and moderate
  - Categories and admin announcements

### ⚙️ Admin Panel
- **Dashboard Modules**
  - Thông báo (Announcement)
  - Server status
  - Game version control
  - Giftcode generation
  - User & account manager
  - IP blocking
  - Payment / Thẻ nạp
  - Webshop product control
  - Lô đề (Lottery-style system)
  - Post & forum moderation

## 🛠 Tech Stack

| Layer       | Tech                        |
|-------------|-----------------------------|
| Frontend    | Next.js 14 (App Router)     |
| Styling     | Tailwind CSS                |
| Animation   | Framer Motion               |
| Backend     | Next.js API Routes          |
| Database    | MongoDB (User, Forum, Data) |
| Cache/OTP   | Redis (Upstash)             |
| Auth        | JWT + Email verification    |
| Hosting     | cPanel (with SSH Git Deploy)|

## 🧪 Local Development

### 1. Clone & Install
```bash
git clone https://github.com/socktow/SoulWorker-Online.git
cd SoulWorker-Online
npm install
