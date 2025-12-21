### Backend API for Kanban Board frontend application

# Kanban Board — Task Management App

Backend service for the Kanban Board application, built with **Node.js**, **Express**, and **MongoDB**.  
This API handles authentication, authorization, task and list management, and ensures secure session handling using JWT access and refresh tokens.

Designed to complement the frontend Kanban application and demonstrate real-world backend patterns suitable for entry-level full‑stack or backend roles.

---

## Features

### Authentication & Security
- User registration and login
- JWT-based authentication (access + refresh tokens)
- Secure HTTP-only cookies
- Refresh-token rotation
- Automatic logout on refresh failure
- Protected routes via middleware

### Kanban API
- Create, update, delete lists
- Create, update, delete tasks
- Task movement between lists
- Persistent ordering using `position`
- Atomic updates for drag-and-drop operations

### Architecture Highlights
- Modular route structure
- Centralized error handling
- Async thunk–friendly API responses
- Scalable folder organization
- Environment-based configuration

---

## Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (Access & Refresh Tokens)
- Axios-compatible API responses
- dotenv / dotenv-flow
- Cookie-parser
- CORS
- Morgan (logging)

---

## Folder Structure

```text
src
├── config
│   ├── db.js
│   └── env.js
├── controllers
│   ├── auth.controller.js
│   ├── list.controller.js
│   └── task.controller.js
├── middlewares
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   └── validate.middleware.js
├── models
│   ├── User.js
│   ├── List.js
│   └── Task.js
├── routes
│   ├── auth.routes.js
│   ├── list.routes.js
│   └── task.routes.js
├── utils
│   ├── token.js
│   └── asyncHandler.js
└── server.js
```

---

## API Flow (Authentication)

1. Client logs in → receives access & refresh tokens  
2. Access token used for protected routes  
3. If access token expires → refresh token endpoint is called  
4. If refresh succeeds → new access token issued  
5. If refresh fails → user is logged out  

---



## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

---

## Environment Variables

Create a `.env` file using the provided example:

```bash
cp .env.example .env
```

Required variable:

```env
PORT=4000
```

> `.env` files are ignored by Git. Never commit secrets.

---

## Demo Credentials

Email: `demo.user@kanban.test`  
Password: `Demo@1234`

⚠️ Mock data only. Reset periodically.

---

## Notes for Reviewers

The demo board uses fictional names (e.g., Justice League, Superman)
purely for demonstration purposes.

## License
MIT
