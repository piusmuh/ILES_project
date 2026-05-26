# Internship Logging & Evaluation System (ILES)

ILES is a full-stack app for internship placements, weekly student logs, supervisor review cycles, evaluations and notifications.

## Tech Stack
- Backend: Django + Django REST Framework + JWT auth
- Frontend: React (Vite) + React Router + Axios
- Database (local): SQLite

## Project Structure
- `backend/` Django API
- `web/` React frontend

## Run Locally (Windows PowerShell)

### 1) Start the backend API
```bash
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
python manage.py migrate
python manage.py seed_demo
python manage.py runserver
```

Backend will run at `http://127.0.0.1:8000`.

### 2) Start the frontend (new terminal)
```bash
cd web
npm install
Copy-Item .env.example .env
npm run dev
```

Frontend will run at `http://localhost:5173`.

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
