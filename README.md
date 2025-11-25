# 🔗 TinyLink — URL Shortener

## 📌 Description
A minimal, production-ready Bit.ly-style URL shortener built for the take-home assignment.
It supports short link creation, custom codes, redirects, click tracking, stats page, and a clean UI.

---

## 🚀 Features

### 🔗 URL Shortening
Auto-generated shortcode (A–Z, a–z, 0–9, length 6–8)
Custom shortcode option (unique globally)
URL validation
Redirect via 302

### 🧑‍💼 User Dashboard
- Add, edit, or delete restaurants and menu items  
- Manage customer orders and update order statuses  
- Dashboard view for overall sales and order statistics  
- Authentication-protected admin access  

### 📊 Analytics
Total click count
Last clicked timestamp
Stats page /code/:code
Dashboard with link list

### 🗑 Manage Links
Delete links
Deleted links return 404 on redirect

### 🖥 UI/UX (React)
Clean dashboard
Loading, empty, success, error states
Inline validation
Copy short URL button
Responsive layout
Table with truncate & ellipsis

### 🛠 Backend (Node.js + Express + MongoDB)
Express REST API
Mongoose schema & validation
CORS configured
Error-handled endpoints
Healthcheck: /healthz

---

## 🛠 Tech Stack

| Category | Technologies |
|-----------|---------------|
| *Frontend* | React.js, CSS3, JavaScript (ES6), Axios |
| *Backend* | Node.js, Express.js |
| *Database* | MongoDB |
| *Authentication* | JWT, bcrypt |
| *Deployment* | Render (Backend),Netlify (Frontend) |
| *Tools* | Postman, Git, GitHub, VS Code |

---

🌐 Live Demo

(https://tinylinkshortener.netlify.app/)

---

## 🧩 Environment Setup

### 🔹 Clone the Repository
```bash
git clone (https://github.com/PoojaDev74/LinkShortener.git)

Backend setup
cd Backend
npm install
npm run dev

Frontend setup
cd Frontend
npm install 
npm run dev
---


## 📜 License
Licensed under the MIT License – feel free to use & modify!
