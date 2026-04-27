# Internship Logging & Evaluation System (ILES)

ILES is a full-stack workflow platform for managing internship placements, weekly student logs, supervisor review cycles, academic evaluation, and notifications.

## Built With
- Backend: Django, Django REST Framework, JWT Authentication
- Frontend: React (Vite), React Router, Axios, React Toastify
- Database: PostgreSQL (Render) / SQLite (local dev fallback)
- Deployment: Render (backend web service + static frontend)

## Key Features
- Role-based accounts: `Student`, `WorkplaceSupervisor`, `AcademicSupervisor`, `Admin`
- Internship placement assignment with supervisor mapping
- Weekly logs with strict workflow states:
  - `Draft -> Submitted -> Reviewed -> Approved`
  - `Reviewed -> Draft` (revision)
  - rejection support (`Rejected -> Draft`)
- Deadline enforcement for late submissions
- Rule enforcement in backend (not only frontend)
- Weighted evaluation scoring:
  - Technical Skills 40%
  - Communication 30%
  - Professionalism 30%
- In-app notifications + email notifications on workflow updates
- Dashboard metrics per role
- Unit tests for workflow and scoring behavior

## Project Structure
- `backend/` Django REST API
- `web/` React frontend
- `render.yaml` one-click Render blueprint

## Backend Setup
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
python manage.py migrate
python manage.py seed_demo
python manage.py runserver
```

## Frontend Setup
```bash
cd web
npm install
copy .env.example .env
npm run dev
```

## Demo Credentials (after `seed_demo`)
- Admin: `admin` / `Admin123!`
- Student: `student1` / `Student123!`
- Workplace Supervisor: `worksup` / `Supervisor123!`
- Academic Supervisor: `acadsup` / `Supervisor123!`

## API Highlights
- Auth
  - `POST /api/auth/register/`
  - `POST /api/auth/login/`
  - `GET /api/auth/me/`
- Placement
  - `GET/POST /api/placements/`
- Weekly Logs
  - `GET/POST /api/weekly-logs/`
  - `PATCH /api/weekly-logs/{id}/transition/`
- Evaluation
  - `GET/POST /api/evaluations/`
- Notifications
  - `GET /api/notifications/`
  - `PATCH /api/notifications/{id}/mark_read/`

## Deployment (Render)
1. Push project to GitHub.
2. In Render, create a new Blueprint and select this repo.
3. Render reads `render.yaml` and provisions:
   - PostgreSQL database
   - Django backend service
   - React static frontend service
4. After first deploy:
   - Set backend `DJANGO_SECRET_KEY`
   - Set backend email SMTP env vars
   - Update frontend env URLs if service names differ
5. Run one-time seed command in Render shell:
   - `python manage.py seed_demo`

## Academic Checklist Coverage
- Requirements engineering and clear workflows
- System design with clean separation: models, serializers, views
- Backend validation and state transition control
- RBAC and role-specific dashboards
- Notification integration (email + in-app toast)
- Testing and deployment readiness

## What to Add Before Submission
- Team member names and registration numbers
- Screenshots of dashboards and key workflows
- A short demo video link
- Final hosted URLs
