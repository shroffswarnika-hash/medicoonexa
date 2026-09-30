# Medinexa – Android Patient Tracker

Medinexa brings medications, appointments, symptoms and health records into one secure, simple place, so patients stay on track and doctors can make better-informed decisions.

## Roles
- **Patient** – track medications (add / edit / delete), book appointments, log symptoms, view records
- **Doctor** – add patients, prescribe medicines, view schedule and patient list
- **Administrator** – add / delete users, suspend or reactivate accounts

## Tech stack
React · TypeScript · Tailwind CSS · Vite

## Run locally
```bash
npm install
npm run dev
```

## Deploy on Netlify
Build command: `npm run build` · Publish directory: `dist`

## Note
This is a front-end prototype. Login accepts any ID/email with a 6+ character password and data is sample data held in memory. A backend (e.g. Supabase or Firebase) is needed for real authentication and storage.
