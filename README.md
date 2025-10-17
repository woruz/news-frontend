# 📰 NewsHub

NewsHub is a simple **news CMS application** with administrative capabilities. This repository contains both the **backend API** and the **frontend React app**.

---

## 💻 Features

### Backend
The backend API provides robust functionality for content management:
* **Admin Authentication:** Secure access using **JWT-based** authentication.
* **CRUD Operations for Articles:** Full control over articles (*Create, Read, Update, Delete*).
* **Article Metadata:** Comprehensive data structure including **Title**, **Slug**, **Content**, **Excerpt**, **Category**, **Author**, **Image URL**, **Publish Date**, and **Tags**.
* **Pagination and Search Support:** Efficient handling of large article collections.
* **Protected Admin Routes:** Secure access control for administrative tasks.
* **Error Handling:** Proper status codes for effective error communication.

### Frontend
The frontend provides a rich user experience for both readers and administrators:
* **Browse Latest Articles:** Easy access to the newest content.
* **View Single Article:** Renders full article content, supporting **markdown**.
* **Search and Filter:** Capability to search for articles and **filter by category**.
* **Admin Dashboard:** Dedicated interface for managing articles.
* **Article Management:** Tools to **Create, Edit, and Delete** articles.
* **Authentication-Protected Admin Routes:** Ensures only authorized users can access management features.

---

## 🛠 Tech Stack

The NewsHub application is built using a modern and powerful technology stack:

| Component | Technologies Used |
| :--- | :--- |
| **Backend** | **Node.js**, **Express**, **TypeScript**, **MongoDB**, **Mongoose**, **JWT** |
| **Frontend** | **React**, **TypeScript**, **Tailwind CSS**, **React Router**, **Axios** |

---

## ⚡ Getting Started

Follow these steps to get the NewsHub application running locally.

## 🏗️ Architecture

```
+---------------------------+
|       React Frontend     |
|---------------------------|
| - Browse latest articles  |
| - Search and filter by    |
|   category or keyword     |
| - View single article     |
| - Admin dashboard UI      |
|   (create, edit, delete)  |
+---------------------------+
           │
           ▼
+---------------------------+
|       Express Backend     |
|---------------------------|
| - JWT-based admin auth    |
| - CRUD endpoints for      |
|   articles                |
|   (POST, GET, PUT, DELETE)|
| - Pagination and search   |
| - Input validation        |
| - Protected routes        |
+---------------------------+
           │
           ▼
+---------------------------+
|      MongoDB Database     |
|---------------------------|
| - Stores articles and     |
|   metadata                |
| - Fields: title, slug,    |
|   content, excerpt,       |
|   category, author, tags, |
|   imageUrl, publishedAt,  |
|   readingTime             |
+---------------------------+
```

---

## 🧰 Technology Stack

### Backend
- **Node.js + Express** – Core API and SSE server
- **Joi** – Schema validation for request body
- **CORS + dotenv + nodemon + tsx** – Development utilities

### Frontend
- **React + Vite** – Lightweight modern frontend
- **Axios API** – API communication and SSE handling
- **Tailwind css** – Responsive and user-friendly layout

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/woruz/news-frontend.git
cd news-frontend
```

### 2. Install dependencies

```bash
# Backend
npm install

```

### 3. create env file

```bash
cp .env.sample .env
```

### 4. Start the application

```bash
npm run dev

---

## 📁 Folder Structure

```
newshub-frontend/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   └── api.ts            # Axios instance & auth token helper
│   ├── assets/
│   │   └── images/           # Static images, logos
│   ├── components/
│   │   ├── Layout.tsx        # Main layout wrapper
│   │   ├── Navbar.tsx
│   │   ├── Loader.tsx
│   │   ├── Pagination.tsx
│   │   └── ArticleCard.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── ArticleDetail.tsx
│   │   └── admin/
│   │       ├── Dashboard.tsx
│   │       ├── CreateArticle.tsx
│   │       ├── EditArticle.tsx
│   │       └── Login.tsx
│   ├── types/
│   │   └── article.ts        # Article type definitions
│   ├── utils/
│   │   └── helpers.ts        # Utility functions
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🧠 Future Enhancements
    ✅ Add image upload support (S3 or local storage)
    ✅ Role-based admin access
    ✅ Rate limiting & security headers
    ✅ Rich text editor for articles
    ✅ Dashboard analytics for article stats
    ✅ Move to PostgreSQL or MySQL for structured data storage

---

## 👨‍💻 Author

Made with ❤️ by [Woruz](https://github.com/woruz)

