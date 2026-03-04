# Todo App

Simple Todo REST API with frontend, built with Next.js (App Router + TypeScript) and Express.js backend using Sequelize + SQLite.  
Frontend styled with ShadCN UI.

**Author:** Muhammad Insan Kamil

---

## **Tech Stack**

- Frontend: Next.js 16 (App Router) + TypeScript + ShadCN UI
- Backend: Node.js + Express.js
- ORM: Sequelize
- Database: SQLite
- Icon library: lucide-react

---

## **Features**

- REST API for Todos:
  - `GET /api/todos` – list all todos
  - `GET /api/todos/:id` – get detail todo
  - `POST /api/todos` – create todo
  - `PUT /api/todos/:id` – update todo
  - `DELETE /api/todos/:id` – delete todo
- Validation & error handling:
  - Title required
  - Proper 400 / 404 / 500 responses
- Frontend:
  - Homepage with center icon + button to Todo page
  - Todo page fetches list from API

---
