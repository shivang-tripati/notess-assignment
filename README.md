# Notess

A full-stack notes application with authentication, OTP login, Google OAuth, and a modern React + Tailwind CSS frontend.

## Features

- User signup/signin with OTP email verification
- Google OAuth login
- Secure JWT authentication
- Notes CRUD (Create, Read, Update, Delete)
- Responsive UI with React and Tailwind CSS
- Prisma ORM for database access

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Axios, React Router
- **Backend:** Node.js, Express, TypeScript, Prisma, Passport.js, JWT
- **Database:** (Configured via Prisma, e.g. PostgreSQL, MySQL, SQLite)
- **Email:** Nodemailer

## Getting Started

### Prerequisites

- Node.js v20.19+ or v22.12+
- npm

### Backend Setup

1. Install dependencies:
    ```sh
    cd backend
    npm install
    ```

2. Set up environment variables:
    - Copy `.env.example` to `.env` and fill in your secrets.

3. Run database migrations:
    ```sh
    npx prisma migrate dev
    ```

4. Start the backend server:
    ```sh
    npm run dev
    ```

### Frontend Setup

1. Install dependencies:
    ```sh
    cd frontend
    npm install
    ```

2. Configure Tailwind CSS:
    - Make sure `tailwind.config.js` and `postcss.config.js` are set up.
    - Ensure your CSS includes Tailwind directives.

3. Start the frontend server:
    ```sh
    npm run dev
    ```

## Folder Structure

```
notess/
  backend/
    src/
      routes/
      middleware/
      config/
    prisma/
    package.json
    tsconfig.json
  frontend/
    src/
      pages/
      App.tsx
    public/
    package.json
    tailwind.config.js
    postcss.config.js
```

## Environment Variables

Backend `.env` example:
```
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
FRONTEND_URL=http://localhost:5173
```

## License

MIT

---

**Note:**  
- Make sure your Node.js version matches Vite’s requirements.
- For Tailwind CSS v4+, use `@tailwindcss/postcss` in