# StudyCafeTools NextJS

This repository contains the modernized, unified application replacing the legacy `Automation_Cafe_Main_Site` and `StudyCafeTools_Dashboard` applications.

## Architecture

The system is a monorepo consisting of:
- **frontend:** Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.
- **backend:** Node.js, Express, TypeScript.
- **Database:** Existing SQL Server (`StudyCafeToolsDB`).
- **Cache:** Redis.

## Local Setup

### Prerequisites
- Node.js (for local development)
- Native Redis Server running on port 6379
- Native SQL Server running locally

### Environment Variables
1. Copy `.env.example` to `backend/.env` for local backend execution.
2. Configure your local `DB_PASSWORD`, `RAZORPAY`, `ZOHO`, and `GOOGLE` credentials.

### Manual Startup

**1. Backend:**
```bash
cd backend
npm install
npm run dev
```

**2. Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Documentation
- `MASTER_MIGRATION_SPECIFICATION.md`: Exhaustive functional migration spec.
- `FEATURE_PARITY_MATRIX.md`: 100% parity tracker.

## Design System
- Built with standard Tailwind + shadcn/ui.
- Light theme is strictly enforced for professional UI/UX.


