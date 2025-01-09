# Task Manager Web Application

This is a **Task Manager Web Application** developed as part of the W3villa Technologies assignment. The application allows users to register, log in, and manage tasks effectively with features to create, view, update, and delete tasks. The project includes frontend, backend, database, and API integration.

---

## Features

### User Features:
- User registration and login with secure authentication (JWT).
- CRUD operations (Create, Read, Update, Delete) for task management.
- Responsive and user-friendly UI.

### Technical Features:
- Backend developed using **Node.js** and **Express.js**.
- Secure database integration using **MongoDB** (or your chosen database).
- API endpoints for user authentication and task management.
- Frontend developed with HTML, CSS, JavaScript (or frameworks like React.js).
- Secure and validated user input with robust error handling.

---

## Requirements

- **Node.js**: v14 or higher
- **MongoDB**: Local or cloud database
- **npm/yarn**: For package management
- **Frontend Framework**: React.js (optional but recommended)

---

## Setup and Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/task-manager-web-app.git
cd Mern-assignment
```

### 2. Install dependencies

#### Backend:
```bash
cd backend
npm install
```

#### Frontend:
```bash
cd ../frontend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `backend` directory and include the following:

```env
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
```

### 4. Run the application

#### Backend:
```bash
cd server
npm start
```

#### Frontend:
```bash
cd client
npm start
```

---



