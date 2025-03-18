# Task Manager – Nuxt 3 & Strapi  

A complete task management application with a backend in Strapi and a frontend in Nuxt 3.

## 🛠 Tech Stack  
- **Backend (BE):** Strapi CMS (Node.js, SQLite/PostgreSQL)  
- **Frontend (FE):** Nuxt 3 (Vue 3, TypeScript)  
- **API Communication:** Fetch API (useStrapiFetch)  
- **Authentication:** JWT (JSON Web Token)  
- **State Management:** `ref()` and `computed()`  
- **UI Framework:** TailwindCSS (optional)  

## Project Structure  
```plaintext
task-manager/
│── backend/ (Strapi)
│   ├── config/ (Strapi settings)
│   ├── src/api/task/ (Task API)
│   ├── src/api/user/ (User API)
│   ├── database/ (DB files)
│   └── .env (Configuration)
│
│── frontend/ (Nuxt 3)
│   ├── pages/ (Pages)
│   │   ├── login.vue (Login page)
│   │   ├── tasks.vue (Main page)
│   │   └── tasks/[id].vue (Task details)
│   ├── composables/ (Helper functions)
│   │   ├── useAuth.ts (Authentication)
│   │   ├── useStrapiFetch.ts (Fetch API)
│   │   ├── useTasks.ts (Task CRUD)
│   ├── middleware/ (Route guards)
│   │   ├── auth.ts (Authorization)
│   ├── nuxt.config.ts (Nuxt configuration)
│   ├── .env (Frontend variables)
│   └── package.json (Dependencies)
```

---

## Backend – Strapi API  

### Installing and Running Strapi  
```bash
cd backend
npm install
npm run develop
```
Strapi will run at `http://localhost:1337/`.

### API Endpoints  
| Method | Endpoint            | Description            |
|--------|---------------------|------------------------|
| POST   | `/api/auth/local`   | Login                 |
| GET    | `/api/tasks`        | Fetch all tasks       |
| POST   | `/api/tasks`        | Create a new task     |
| PUT    | `/api/tasks/:id`    | Update a task         |
| DELETE | `/api/tasks/:id`    | Delete a task         |

### User Permissions Setup  
In the Strapi Admin Panel, configure:  
- **Authenticated Users → Allowed:** `find`, `findOne`, `create`, `update`, `delete`  

---

## Frontend – Nuxt 3  

### Installing and Running Nuxt  
```bash
cd frontend
npm install
npm run dev
```
The frontend will run at `http://localhost:3000/`.

### `.env` Configuration  
Set the following in `frontend/.env`:  
```ini
NUXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

---

## Features  
- Login via JWT  
- CRUD operations for tasks (create, edit, delete)  
- Automatic data synchronization with the backend  
- Reactive task updates (live updates)  

---

## Important Files  
| File                                   | Description                     |
|----------------------------------------|---------------------------------|
| `backend/src/api/task/controllers/task.ts` | Task API logic                 |
| `backend/src/api/user/controllers/user.ts` | User API                       |
| `frontend/composables/useTasks.ts`       | Task CRUD operations           |
| `frontend/composables/useAuth.ts`        | User authentication            |
| `frontend/pages/tasks.vue`               | Task list page                 |
| `frontend/pages/login.vue`               | Login page                     |

---

## Debugging & Troubleshooting  

### Backend Errors  
- **`403 Forbidden`** → Check permissions in the Strapi Admin Panel.  
- **`404 Not Found`** → Incorrect ID in PUT or DELETE requests.  
- **`500 Server Error`** → Check Strapi logs.  

### Frontend Errors  
- **`Cannot read properties of undefined`** → Validate API responses properly.  
- **`Unexpected token '<'`** → API is not returning JSON (possibly a CORS issue).  
- **`Network Error`** → Is the backend running? Try `npm run develop`.  

---

## Future Enhancements  
- 🔹 Add TailwindCSS for better design  
- 🔹 Support file uploads for tasks  
- 🔹 Notifications via WebSockets  

---

## Authors  
**Michal Antuš** (Full Stack Developer)  
Technologies: TypeScript, Vue.js, Nuxt 3, Strapi  
