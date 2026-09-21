# Hitesh Thacker - Portfolio Platform

A modern, full-stack personal portfolio and content management platform built with **Next.js 15 (App Router)**, **Express.js**, **TypeScript**, and **MongoDB**.

---

## 🚀 Architectural Overview

```
├── frontend/             # Next.js 15 App Router, Tailwind CSS, Axios, Lucide Icons
│   ├── src/
│   │   ├── app/          # App router pages (Home, About, Projects, Contact, Admin)
│   │   ├── components/   # UI primitives, Sections, Layouts
│   │   ├── lib/          # Axios instance, fallback data
│   │   ├── services/     # API integration layer
│   │   └── types/        # Shared TypeScript interfaces
│   └── public/           # Static assets, placeholder resume
│
└── backend/              # Express.js REST API with TypeScript & MongoDB
    └── src/
        ├── config/       # Environment validation & DB connection
        ├── controllers/  # HTTP route controllers
        ├── middlewares/  # Error handler, JWT auth
        ├── models/       # TypeScript data interfaces
        ├── repositories/ # Native MongoDB data access layer
        ├── routes/       # Express v1 routing
        ├── services/     # Business logic layer
        ├── utils/        # ApiError, logger, helpers
        └── validators/   # Zod request validation schemas
```

---

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS, Axios, Lucide React
- **Backend**: Express.js, TypeScript, MongoDB Native Driver, Zod, JWT
- **Database**: MongoDB (Local or MongoDB Atlas)

---

## ⚙️ Quick Start & Local Setup

### Prerequisites
- **Node.js**: v18+ (tested on v22)
- **npm**: v9+
- **MongoDB**: Local MongoDB Community Edition running on `mongodb://localhost:27017` or MongoDB Atlas URI

### 1. Clone / Open the Repository
```bash
git clone https://github.com/ht1505/portfolio-platform.git
cd "Hitesh Portfolio"
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```
The backend API starts on **http://localhost:5000** (Health & endpoints at `/api/v1/*`).

### 3. Frontend Setup
```bash
cd ../frontend
npm install
cp .env.example .env.local
npm run dev
```
The frontend starts on **http://localhost:3000**.

---

## 🔐 Admin Dashboard Access

Navigate to **http://localhost:3000/admin** or click **Admin** in the navigation bar.

**Development Credentials:**
- **Email**: `admin@localhost.dev`
- **Password**: `admin123`

The dashboard allows managing:
- **Projects**: Add, edit, or delete case studies and technical architectures
- **Experience**: Manage work experience, internships, and education history
- **Skills**: Add and categorize tech stack items
- **Inquiries**: Review messages sent via the contact form
- **Resume**: Preview and manage resume uploads

---

## 🛡️ Security Limitations & Production Readiness

| Area | Current Development State | Production Recommendation |
|------|---------------------------|---------------------------|
| **Admin Auth** | Dev-only plaintext check + JWT | Bcrypt password hashing, refresh token rotation |
| **CORS** | Configured for `localhost:3000` | Whitelist production domain only |
| **Validation** | Zod schema validation on requests | Add sanitization against XSS and NoSQL injection |
| **Rate Limiting** | None | Add `express-rate-limit` for endpoints |
| **Resume Storage** | Local static asset | AWS S3 with pre-signed upload URLs & CloudFront CDN |
| **Email Delivery** | Stored in MongoDB | Integrate Resend or AWS SES for real-time notifications |

---

## 👨‍💻 Author
**Hitesh Thacker**  
Computer Science & Engineering Student | Full-Stack Developer  
- **Email**: [thackerhitesh9712@gmail.com](mailto:thackerhitesh9712@gmail.com)  
- **GitHub**: [github.com/ht1505](https://github.com/ht1505)  
- **LinkedIn**: [linkedin.com/in/hitesh-thacker-b22682284](https://linkedin.com/in/hitesh-thacker-b22682284/)
