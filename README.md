# 📰 MERN Blog Platform with Role-Based Access Control (RBAC)

A full-stack MERN Blog Platform developed as part of my internship project. The application includes a secure admin panel with Role-Based Access Control (RBAC), a public blog website, SEO features, category/tag management, contact management, and user management.

---
Admin Creds:

Super Admin
"email": "john@example.com",
"password": "123456"



Editor
"email": "arinvashisth@gmail.com",
  "password": "123456"



Author
"email": "author@rewathi.com",
"password": "123456"

---


## 🚀 Live Demo

### 🌐 Public Website
[User Website](https://blog-platform-dun-two.vercel.app/)

### 🔐 Admin Panel
[Admin Panel](https://blog-platform-awsw.vercel.app/)

### ⚙️ Backend API
[Backend API](https://rewathi-blog-api.onrender.com/)

---

## 📌 Features

### 👨‍💼 Admin Panel

- Secure JWT Authentication
- Role-Based Access Control (RBAC)
- Dashboard with statistics
- Blog Management (CRUD)
- User Management
- Category Management
- Tag Management
- Contact Message Management
- Image Upload
- Toast Notifications
- Search & Pagination

---

### 👥 User Roles

| Role | Permissions |
|------|-------------|
| SuperAdmin | Full access to all modules |
| Editor | Create, edit and manage all blogs |
| Author | Create, edit and delete only their own blogs |
| Viewer | Public website access (no login required) |

---

### 🌍 Public Website

- Latest Published Blogs
- Blog Detail Page
- Category Listing
- Tag Listing
- Author Page
- About Page
- Contact Page
- Contact Form
- SEO Optimized Blog Pages

---

## 🛠 Tech Stack

### Frontend

- React.js
- React Router DOM
- Bootstrap 5
- Axios
- React Toastify

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- bcryptjs

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## 📂 Project Structure

```
blog-platform/

├── admin-panel/
│   ├── src/
│   └── ...

├── frontend/
│   ├── src/
│   └── ...

├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── server.js

└── README.md
```

---

## 🔑 Environment Variables

### Backend (.env)

```
PORT=5000

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY
```

### Admin Panel (.env)

```
VITE_API_URL=https://YOUR-RENDER-URL.onrender.com/api
```

### Public Frontend (.env)

```
VITE_API_URL=https://YOUR-RENDER-URL.onrender.com/api
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/blog-platform.git

cd blog-platform
```

---

### Backend

```bash
cd backend

npm install

npm run dev
```

---

### Admin Panel

```bash
cd admin-panel

npm install

npm run dev
```

---

### Public Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## 🔒 Role-Based Access Control

- JWT Authentication
- Protected Routes
- Role Middleware
- Author Ownership Validation
- Secure CRUD Operations

---

## 📈 SEO Features

- Meta Title
- Meta Description
- Canonical URL
- Open Graph Tags
- Twitter Card
- FAQ Section
- Internal Links
- External Links

---

## ✨ Future Improvements

- Rich Text Editor
- Comment System
- Email Notifications
- Dark Mode
- Responsive Mobile Layout
- Analytics Dashboard

---

## 👨‍💻 Developed By

**Arin Vashisth**

B.Tech Computer Science Engineering

University of Engineering & Management, Jaipur

GitHub: https://github.com/arinVashisth

---

## 📄 License

This project is developed for educational and internship purposes.
