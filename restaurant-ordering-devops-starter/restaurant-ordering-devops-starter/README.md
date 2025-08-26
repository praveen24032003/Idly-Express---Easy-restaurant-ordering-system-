# Restaurant Ordering – DevOps Starter

## Run with Docker
```bash
docker compose up --build
```
- API → http://localhost:8080/api/health
- Frontend → http://localhost:5173
- phpMyAdmin → http://localhost:8081 (user: restaurant / pass: restaurant_pass)

## Local Dev
Backend:
```bash
cd backend && cp .env.example .env && npm i && npm run dev
```
Frontend:
```bash
cd frontend && cp .env.example .env && npm i && npm run dev
```

## Notes
- Update Razorpay env vars for real payments.
- Add auth-protected admin UI and proper cart management.
