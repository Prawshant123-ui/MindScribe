<div align="center">

# 🧠 MindScribe

**An e-learning platform for Tribhuvan University students**
Browse, preview, and download notes across faculties — all in one place.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-mindscribe--02.netlify.app-1D9E75?style=for-the-badge&logo=netlify&logoColor=white)](https://mindscribe-02.netlify.app/)

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Framer](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=flat&logo=chart.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white)

</div>

---

## 📖 About

MindScribe is a centralized e-learning platform built specifically for students of **Tribhuvan University (TU)**. Students can browse, preview, and download study materials — notes and videos — organized by faculty and subject. An admin panel allows authorized users to manage all content, monitor users, and view analytics from a dedicated dashboard.

Note: The  UI of this app is made using claude and lovable .

---

## ✨ Features

### 👨‍🎓 For Students
- 📂 **Browse notes by faculty & subject** — organized specifically for TU curriculum
- 📥 **One-click download** of notes in PDF and other supported formats
- 🎥 **Video resources** available alongside written material
- 🔐 **User authentication** — register, login, and manage your account

### 🛠️ For Admins
- 📊 **Analytics dashboard** powered by Chart.js — track uploads, users, and downloads
- 📤 **Upload notes & videos** directly via Cloudinary integration
- 👥 **User management** — view and control user access
- 🗂️ **Content management** — add, update, or remove notes and videos

### 🔒 Security & Reliability
- **JWT-based authentication & authorization**
- **Rate limiting** to protect API endpoints from abuse
- **Server-side validation** on all forms and file uploads
- **Role-based access control** (Admin vs. User)

---

## 🧰 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React + Vite | UI framework & fast build tool |
| Frontend | Tailwind CSS | Utility-first styling |
| Frontend | Framer Motion | Smooth animations & transitions |
| Frontend | Chart.js | Admin panel data visualizations |
| Backend | Express.js | REST API server |
| Backend | MongoDB | NoSQL database for content & users |
| Backend | Cloudinary | File & media upload/storage |
| Backend | JWT | Secure authentication tokens |
| Hosting | Netlify/Render | Frontend/Backend deployment |


---

## 📁 Project Structure

```
mindscribe/
├── frontend/               # React + Vite (Lovable-assisted)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-level pages
│   │   ├── admin/          # Admin panel views
│   │   └── assets/         # Static assets
│   └── public/
│
└── backend/                # Express.js (custom built)
    ├── routes/             # API route definitions
    ├── controllers/        # Request handlers
    ├── models/             # Mongoose schemas
    └── middleware/         # Auth, rate limiting, validation
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Cloudinary account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/mindscribe.git
   cd mindscribe
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Start the backend server**
   ```bash
   npm run dev
   ```

5. **Set up and run the frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

6. Open your browser at `http://localhost:5173`

---

## 🌐 Live Demo

> 🔗 [https://mindscribe-02.netlify.app/](https://mindscribe-02.netlify.app/)

---

## 🤝 Credits & Acknowledgements

- **Frontend** — built with the assistance of [Lovable](https://lovable.dev/), an AI-powered frontend builder.
- **Backend** — fully custom-coded from scratch using Express.js and MongoDB.
- **Media hosting** — powered by [Cloudinary](https://cloudinary.com/).
- **Frontend deployment** — hosted on [Netlify](https://www.netlify.com/).
- **Backend deployment** - hosted on Render

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
Made with ❤️ for TU students
</div>
