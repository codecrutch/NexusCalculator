# NexusCalculator: Rails to NestJS Migration Plan

This document tracks the migration of the NexusCalculator app from Ruby on Rails to a full TypeScript stack using NestJS for the backend. Each major step is listed as a checklist item. As tasks are completed, they will be checked off and details will be updated.

---

## Migration Todo List

### 1. Project Setup
- [x] Scaffold new NestJS project (`nexus-calc-backend/`)
- [x] Set up TypeScript configuration
- [ ] Configure environment variables
- [ ] Set up Git and initial commit

### 2. Database & ORM
- [x] Choose and configure database (PostgreSQL)
- [x] Set up TypeORM/Prisma
- [ ] Define entities for:
  - [ ] User
  - [ ] Character
  - [ ] Creature
  - [ ] Cave
- [ ] Set up migrations and seed data

### 3. API Design & Controllers
- [ ] Create RESTful controllers for:
  - [ ] Users
  - [ ] Characters
  - [ ] Creatures
  - [ ] Caves
- [ ] Implement CRUD endpoints
- [ ] Add validation and DTOs

### 4. Authentication & Authorization
- [ ] Set up Passport.js (JWT or session-based)
- [ ] Implement user registration/login
- [ ] Protect routes as needed

### 5. Asset Migration
- [ ] Move static assets (images, stylesheets) to new public/static directory

### 6. Frontend Strategy
- [ ] Decide on frontend approach (SSR/SPA)
- [ ] Scaffold frontend project (if applicable)
- [ ] Connect frontend to NestJS API

### 7. Testing
- [ ] Set up Jest for unit/integration tests
- [ ] Write tests for controllers/services

### 8. Deployment
- [ ] Prepare Dockerfile and docker-compose
- [ ] Set up environment configs for production
- [ ] Deploy to chosen platform

---

## Notes
- Backend directory: `nexus-calc-backend`
- Database: PostgreSQL
- Update this document as tasks are completed or requirements change.
- Reference this checklist for progress tracking and next steps. 