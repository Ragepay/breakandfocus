# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Break & Focus** — full-stack productivity app for managing Pomodoro-style work/break sessions. Monorepo with `backend/` (Express + TypeScript + MongoDB) and `frontend/` (Next.js 14 + React 18 + TypeScript).

## Commands

```bash
# Backend (from /backend)
npm run dev        # nodemon + tsx watch
npm run build      # tsc compilation
npm start          # run compiled dist/
npm test           # Jest + Mocha e2e tests

# Frontend (from /frontend)
npm run dev        # Next.js dev server
npm run build      # static export to /out
npm run lint       # ESLint
```

API docs at `http://localhost:3000/api-docs` when backend is running.

## Architecture

### Backend — `backend/src/`

Entity-based structure (not layered). Each entity owns its own model, controller, DTO, validation, routes, and service files:

- `entity.users/` — auth, profile, password reset (email via Nodemailer)
- `entity.techniques/` — system techniques + personal user techniques (two separate Mongoose collections)
- `entity.sessions/` — work session CRUD and scoring
- `config/server.ts` — Express app bootstrap; mounts all routers in order: public → userJWT-protected → adminJWT-protected
- `middlewares/auth.mid.ts` — Passport JWT strategies (`userJWT`, `adminJWT`); token generated in `entity.users/helper.ts`
- `storage/memory.storage.ts` — in-memory login attempt tracking (non-persistent, resets on restart)

Request flow: `routes.ts` → `controllers.handler.ts` (wraps async errors) → `controller.ts` → `dto.ts` (Zod validation) → `service/*.ts` (DB logic) → Mongoose model.

### Frontend — `frontend/src/`

- `store/index.ts` — single Zustand store; persists `user` + `techniques` to localStorage (sessions are not persisted)
- `services/api.ts` — Axios instance with Bearer token interceptor; `services/index.ts` exports all API call functions
- `hooks/useFetchData.ts` — generic data fetching hook used across components
- `app/(auth)/` — login + register pages (grouped route)
- `app/home/` — main timer page
- `app/profile/`, `app/settings/`, `app/statistics/` — protected pages (redirect if no user in store)
- `types/index.ts` — shared TypeScript interfaces (`UserI`, `TechniqueI`, `SessionI`)

Auth flow: login → store token in Zustand → Axios interceptor adds `Authorization: Bearer <token>` → protected pages check `store.user` and redirect if null.

### Key Cross-Cutting Concerns

- JWT is generated in `entity.users/helper.ts` (10-day expiry) — the unused `generateToken` in `auth.mid.ts` is dead code
- MongoDB uses string `_id` in session refs instead of `ObjectId` — `.populate()` won't work on sessions
- `next.config.mjs` uses `output: "export"` (fully static); no SSR, no API routes, no dynamic routing at build time
- Frontend password validation (requires uppercase + number + special char) is stricter than backend (min 6 chars only)
