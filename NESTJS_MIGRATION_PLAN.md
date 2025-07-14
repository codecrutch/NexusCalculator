# NexusCalculator: Rails to NestJS Migration Plan

This document tracks the migration of the NexusCalculator app from Ruby on Rails to a full TypeScript stack using NestJS for the backend. Each major step is listed as a checklist item. As tasks are completed, they will be checked off and details will be updated.

---

## Migration Todo List

### 1. Project Setup
- [x] Scaffold new NestJS project (`nexus-calc-backend/`)
- [x] Set up TypeScript configuration
- [x] Configure environment variables
- [x] Set up Git and initial commit

### 2. Database & ORM
- [x] Choose and configure database (PostgreSQL)
- [x] Set up TypeORM/Prisma
- [x] Define entities for:
  - [x] User
  - [x] Character
  - [x] Creature
  - [x] Cave
- [x] Set up migrations and seed data

### 3. API Design & Controllers
- [x] Create RESTful controllers for:
  - [x] Users
  - [x] Characters
  - [x] Creatures
  - [x] Caves
- [x] Implement CRUD endpoints
- [x] Add validation and DTOs

### 4. Authentication & Authorization
- [x] Set up Passport.js (JWT strategy)
- [x] Implement user registration/login
- [x] Protect routes as needed

### 5. Asset Migration
- [x] Move static assets (images, stylesheets) to new public/static directory

### 6. Frontend Strategy
- [x] Decide on frontend approach (SSR/SPA)
- [x] Scaffold frontend project (if applicable)
- [] Connect frontend to NestJS API

### 7. Testing
- [ ] Set up Jest for unit/integration tests
- [ ] Write tests for controllers/services

### 8. Deployment
- [ ] Prepare Dockerfile and docker-compose
- [ ] Set up environment configs for production
- [ ] Deploy to chosen platform

---

## Completed Features

### ✅ Backend API (Complete)
- **NestJS Backend**: Fully functional TypeScript backend
- **TypeORM Integration**: Database operations with PostgreSQL
- **CRUD Operations**: Complete REST API for all entities
- **Data Validation**: DTOs with class-validator
- **Entity Relationships**: User ↔ Character, Cave ↔ Creature
- **Database Management**: Scripts for setup, seeding, and reset

### ✅ Authentication & Authorization (Complete)
- **JWT Authentication**: Token-based authentication with Passport.js
- **User Registration**: Secure user registration with password hashing
- **User Login**: Email/password authentication
- **Protected Routes**: JWT guards for sensitive endpoints
- **Password Hashing**: bcryptjs for secure password storage
- **Auth Endpoints**:
  - `POST /auth/register` - User registration
  - `POST /auth/login` - User login
  - `GET /user/profile` - Get user profile (protected)

### ✅ Database Management Scripts
- **`scripts/setup-db.sh`**: Sets up PostgreSQL in Colima
- **`scripts/seed-db.sh`**: Seeds database with sample data
- **`scripts/reset-db.sh`**: Resets database completely
- **`scripts/status-db.sh`**: Checks database and container status

### ✅ Documentation
- **Comprehensive README**: Setup, API endpoints, troubleshooting
- **Migration Notes**: Tracked progress and decisions
- **Script Documentation**: Clear usage instructions

---

## Authentication Implementation Details

### JWT Configuration
- **Secret**: Configurable via `JWT_SECRET` environment variable
- **Expiration**: 24 hours
- **Strategy**: Passport JWT strategy with Bearer token

### Protected Routes
- `GET /user` - Get all users (protected)
- `GET /user/profile` - Get current user profile (protected)
- `GET /user/:id` - Get user by ID (protected)
- `PATCH /user/:id` - Update user (protected)
- `DELETE /user/:id` - Delete user (protected)

### Public Routes
- `POST /user` - Create user (public, for registration)
- `POST /auth/register` - User registration (public)
- `POST /auth/login` - User login (public)

### Security Features
- **Password Hashing**: bcryptjs with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Input Validation**: DTOs with class-validator
- **Error Handling**: Proper error responses for auth failures

---

## Notes
- Backend directory: `nexus-calc-backend`
- Database: PostgreSQL (via Colima/Docker)
- API Base URL: `http://localhost:3000`
- Authentication: JWT with Passport.js
- All CRUD endpoints tested and working
- Database seeding with sample data available
- Update this document as tasks are completed or requirements change.
- Reference this checklist for progress tracking and next steps. 

# Migration Plan: Step 6 - Frontend Integration & API Consumption

## Technology Choices
- **Frontend Framework:** React (with TypeScript)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Data Fetching/State:** TanStack Query (React Query)

## Step 6 Tasks

- [x] Decide on frontend stack (Vite, Tailwind, TanStack Query)
- [ ] Scaffold new React app with Vite (TypeScript template)
- [ ] Install and configure Tailwind CSS
- [ ] Install and configure TanStack Query
- [ ] Set up API base URL with Vite environment variables
- [ ] Set up Axios for API requests
- [ ] Set up React Query provider
- [ ] Create API utility modules (auth, characters, etc.)
- [ ] Build authentication flow (login/register, JWT storage)
- [ ] Build Characters page (list, detail)
- [ ] Build integration for static assets (images)
- [ ] Document asset usage and API integration in frontend README

## Implementation Steps

### 1. Scaffold React App with Vite
```bash
npm create vite@latest nexus-calc-frontend -- --template react-ts
cd nexus-calc-frontend
npm install
```

### 2. Install Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Edit `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { extend: {} },
  plugins: [],
}
```

Edit `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Import in `src/main.tsx`:
```ts
import './index.css';
```

### 3. Install TanStack Query
```bash
npm install @tanstack/react-query
```

### 4. (Optional) Install Axios
```bash
npm install axios
```

### 5. Set Up API Base URL
Create `.env` in the frontend root:
```
VITE_BACKEND_API_URL=http://localhost:3000
```

### 6. Set Up API Client
Create `src/api/client.ts`:
```ts
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  headers: { 'Content-Type': 'application/json' },
});
```

### 7. Set Up React Query Provider
In `src/main.tsx`:
```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
```

### 8. Test Tailwind
In `App.tsx`:
```tsx
export default function App() {
  return <h1 className="text-4xl font-bold text-blue-600">Hello Nexus!</h1>;
}
```

---

**Next:**
- Build out authentication flow (login/register, JWT storage)
- Build Characters page and other entity pages
- Integrate static asset URLs from backend
- Document usage in frontend README 