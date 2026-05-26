# Internship Logging & Evaluation System (ILES)

ILES is a full-stack app for internship placements, weekly student logs, supervisor review cycles, evaluations and notifications.

## Tech Stack
- Backend: Django + Django REST Framework + JWT auth
- Frontend: React (Vite) + React Router + Axios
- Database (local): SQLite

## Project Structure
- `backend/` Django API
- `web/` React frontend

## Demo Credentials (after `seed_demo`)
- Admin: `admin` / `Admin123!`
- Student: `student1` / `Student123!`
- Workplace Supervisor: `worksup` / `Supervisor123!`
- Academic Supervisor: `acadsup` / `Supervisor123!`

## API Endpoints (examples)
- Auth: `POST /api/auth/register/`, `POST /api/auth/login/`, `GET /api/auth/me/`
- Placement: `GET/POST /api/placements/`
- Weekly logs: `GET/POST /api/weekly-logs/`, `PATCH /api/weekly-logs/{id}/transition/`
- Evaluation: `GET/POST /api/evaluations/`
- Notifications: `GET /api/notifications/`, `PATCH /api/notifications/{id}/mark_read/`
