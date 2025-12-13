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

### Install dependencies
```sh
npm install
```

### Environment variables
Create a `.env` file:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
CORS_ORIGIN=http://localhost:5173
```

### Run server
```sh
npm run dev
```

---

## Scripts
```sh
npm run dev     # Start server in development mode
npm start       # Start server in production
```

---

## License
MIT
