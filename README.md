# Kanban Backend

RESTful backend for a **Kanban-style task management system** built with **Node.js, Express, and MongoDB**.

The API allows authenticated users to manage **lists and tasks**. Each list can contain multiple tasks, enabling flexible task organization based on user-defined list structures.



# Core Features

* Versioned REST API (`/api/v1`)
* JWT-based authentication
* CRUD operations for lists
* CRUD operations for tasks
* User-specific data ownership
* Request validation using schemas
* Centralized error handling
* Modular MVC architecture
* MongoDB database integration



# Data Model Overview

The backend follows this structure:

User → Lists → Tasks

Example:

```id="ahwmlv"
User
 ├── List
 │     ├── Task
 │     ├── Task
 │
 ├── List
 │     ├── Task
 │
 └── List
       ├── Task
```

Lists are **fully customizable** and created by users. Tasks belong to a specific list.



# Project Structure

```id="dznr2a"
src/
├── app.js
├── server.js
├── loadEnv.js
│
├── config/
├── constants/
│
├── controllers/
│   ├── auth.controller.js
│   ├── list.controller.js
│   └── task.controller.js
│
├── db/
│   └── connectDB.js
│
├── middlewares/
│   ├── auth.middleware.js
│   ├── errorHandler.middleware.js
│   └── validate.middleware.js
│
├── models/
│   ├── user.model.js
│   ├── list.model.js
│   └── task.model.js
│
├── routes/
│   ├── auth.routes.js
│   ├── list.routes.js
│   └── task.routes.js
│
├── utils/
│   ├── ApiError.js
│   └── logger.js
│
└── validations/
	├── auth.schema.js
	├── list.schema.js
	└── task.schema.js
```

# API Modules

## Authentication

Handles user authentication and protected routes.

Features:

* User registration
* User login
* JWT token generation
* Route protection middleware

## Lists

Lists are containers used to group tasks.

Users can:

* Create lists
* Retrieve their lists
* Update list details
* Delete lists

Each list belongs to a specific user.

## Tasks

Tasks are items created inside lists.

Supported operations:

* Create tasks
* Retrieve tasks
* Update task details
* Move tasks between lists
* Delete tasks

Typical task fields include:

* title
* description
* list reference
* timestamps

# Security Features

The backend implements several security practices:

* JWT authentication
* Route protection middleware
* Input validation
* Centralized error handling
* Resource ownership checks

These ensure users can only access and modify **their own lists and tasks**.

# Environment Variables

Create a `.env` file in the project root.

Required variables:

```
PORT=

DB_CONNECT_STRING=

ACCESS_TOKEN_SECRET=

ACCESS_TOKEN_EXPIRY=

CORS_ORIGIN=
```

# Local Development

Install dependencies:

```
npm install
```

Create `.env` file with required variables.

Start development server:

```
npm run dev
```

The server will start on the configured `PORT`.

# API Base URL

```
/api/v1
```

Example endpoints:

```
POST   /api/v1/auth/login
POST   /api/v1/auth/register

GET    /api/v1/lists
POST   /api/v1/lists

GET    /api/v1/tasks
POST   /api/v1/tasks
```

# License

MIT License
