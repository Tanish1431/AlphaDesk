# AlphaDesks

A modern fintech investment platform built on the MERN stack.

## Architecture
- **Frontend**: React, React Router, Chart.js (Port 3000)
- **Backend**: Node.js, Express, MongoDB (Port 3002)

## Setup
1. From the root directory, install all dependencies:
   ```bash
   npm run install:all
   ```
2. Configure your `.env` in the `backend/` directory with `MONGO_URL` and `JWT_SECRET`.
3. Start both servers concurrently:
   ```bash
   npm start
   ```
