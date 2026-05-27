# MindScribe — Frontend

Modern e-learning platform frontend built with **React + Vite + JavaScript + TailwindCSS + Framer Motion + Chart.js**.

## Stack
- React 18 (JavaScript, no TypeScript)
- Vite 5
- TailwindCSS 3
- React Router 6
- Axios
- Framer Motion
- Chart.js + react-chartjs-2
- jwt-decode (to detect role from JWT)

## Folder Structure
```
src/
 ├── api/         # axios + endpoint wrappers
 ├── assets/      # images, icons
 ├── components/  # shared UI
 ├── context/     # AuthContext
 ├── pages/       # route pages (public + user + admin)
 ├── App.jsx
 └── main.jsx
```

## Getting started
```bash
npm install
cp .env.example .env       # adjust VITE_API_URL if needed
npm run dev                # starts on http://localhost:8080
```

Your backend (`server.js`) should be running on `http://localhost:2000` and its CORS already allows `http://localhost:8080`.

## Admin access
The admin user is seeded by your backend's `seedAdmin.js` using `ADMIN_EMAIL` / `ADMIN_PASSWORD`. Log in with those credentials — the frontend reads the `role` claim from the JWT and routes admins to `/admin`.

## Build
```bash
npm run build
npm run preview
```
