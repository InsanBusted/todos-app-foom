# Take Home Test – Software Engineer Internship - Todo App

Simple Todo REST API with frontend, built with Next.js (App Router + TypeScript) and Express.js backend using Sequelize + SQLite.  
Frontend styled with ShadCN UI.

**Author:** Muhammad Insan Kamil

---

## Tech Stack

- Frontend: Next.js 16 (App Router) + TypeScript + ShadCN UI
- Backend: Node.js + Express.js
- ORM: Sequelize
- Database: SQLite
- Icon library: lucide-react

---

## Features

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
  - Create, edit, and delete todos without page refresh (optimistic update)

---

## How to Run

### Backend

```bash
cd backend
npm install
npx sequelize-cli db:migrate
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Buat file `.env` di dalam folder `frontend` dan tambahkan:

```env
NEXT_PUBLIC_TODO_URL=URL_DARI_BACKEND
```

Contoh jika backend berjalan secara lokal:

```env
NEXT_PUBLIC_TODO_URL=http://localhost:3001
```

Kemudian jalankan:

```bash
npm run dev
```

---

## Design Decisions

**SQLite sebagai database** — Dipilih karena aplikasi ini berskala kecil dan bersifat lokal. SQLite tidak memerlukan setup server database terpisah, sehingga mempercepat proses development dan memudahkan siapa saja untuk langsung menjalankan proyek tanpa konfigurasi tambahan.

**Sequelize sebagai ORM** — Memungkinkan interaksi dengan database menggunakan JavaScript tanpa perlu menulis query SQL secara manual. Migration juga memudahkan pengelolaan perubahan struktur database.

**Optimistic update di frontend** — Setelah create atau edit todo, data langsung diperbarui di state lokal tanpa menunggu fetch ulang dari server. Ini membuat UI terasa lebih responsif dan mengurangi beban network request.

**Separation of concerns dengan custom hooks** — Logic fetching dan mutasi data dipisahkan ke dalam hooks (`useGetTodo`, `useCreateTodo`, `useUpdateTodo`) agar komponen UI tetap bersih dan mudah di-maintain.

**Modal reusable untuk create & edit** — `TodoFormModal` digunakan untuk kedua operasi dengan prop `mode`, sehingga tidak perlu membuat dua komponen terpisah yang memiliki tampilan serupa.

**Feature-based folder structure** — Semua file yang berkaitan dengan fitur todos (components, hooks, pages, types) dikumpulkan dalam satu folder `features/todos/`. Pendekatan ini memudahkan pengelolaan kode karena jika ingin menambah atau menghapus suatu fitur, cukup bekerja dalam satu folder tanpa perlu mencari file yang tersebar. Komponen dan hooks yang bersifat global diletakkan di luar folder features agar bisa digunakan bersama lintas fitur.

---

## Possible Improvements

- **Status "In Progress"** — Menambahkan status ketiga selain *Todo* dan *Done*, sehingga pengguna bisa menandai todo yang sedang dikerjakan.
- **Todo by user** — Menambahkan sistem autentikasi agar setiap pengguna hanya bisa melihat dan mengelola todo miliknya sendiri.
- **Skala prioritas todo** — Menambahkan tingkat prioritas (misalnya Low, Medium, High) pada setiap todo, lengkap dengan sorting dan filter berdasarkan prioritas.
- **AI Chatbot** — Integrasi chatbot yang bisa menjawab pertanyaan atau memberikan saran berdasarkan daftar todo yang dimiliki pengguna, misalnya *"Todo mana yang harus saya selesaikan hari ini?"*.
