# Master Migration Specification
**Project:** StudyCafeTools NextJS Migration
**Status:** Discovery & Audit Complete (Phase 0)

This document serves as the primary implementation specification for the migration of `Automation_Cafe_Main_Site` and `StudyCafeTools_Dashboard New` into a single, modern Next.js/Node.js application.

---

## 1. System Overview & Architecture

### Existing Applications
1. **Automation_Cafe_Main_Site:** ASP.NET Core MVC public-facing application handling user registration, payment, referral system, blogs, demo bookings, and the public UI.
2. **StudyCafeTools_Dashboard New:** ASP.NET Core MVC dashboard application for administrative operations, user management, plan management, analytics, and background subscription expiry processing.

### Database Strategy
- **Database:** `StudyCafeToolsDB` (Existing SQL Server database)
- **Constraint:** The migration MUST use the existing database. No tables, columns, or relationships may be dropped or destructively modified.
- **ORM:** The backend will use appropriate parameterized SQL or an ORM strictly in introspection/read-only schema mode. Migrations must not be executed against production.

### New Architecture
The new system is a monorepo containing decoupled frontend and backend services:
- **Frontend:** Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui.
- **Backend:** Node.js, Express/Fastify (RESTful), TypeScript.
- **Caching:** Redis.
- **Background Jobs:** Node-based scheduler (e.g., node-cron) communicating with Redis.
- **Deployment:** Dockerized containers for Frontend, Backend, and Redis.

---

## 2. Module Specifications

### 2.1 Public & User Site (formerly Automation_Cafe_Main_Site)

#### 2.1.1 Public Pages
- **Submodule/Page:** Landing, About, Services, Ethics, Pricing, Legal Pages
- **Original Route:** `/`, `/Home/About`, `/Home/Pricing`, etc.
- **Original Controller:** `HomeController`
- **Original Database Tables:** `ReferralSettings` (for pricing)
- **Roles Allowed:** Public
- **Business Rules:** Pricing page must dynamically fetch data from `ReferralSettings`. Landing page must check for `ref=` URL parameter and set a 90-day cookie for referral attribution.
- **Expected Result:** Modernized, fast loading pages using Next.js Server Components.
- **New Next.js Equivalent:** `/app/(public)/` routes.
- **Migration Status:** Pending

#### 2.1.2 Authentication (Login, Register, OTP)
- **Submodule/Page:** User Login, Registration, Password Reset
- **Original Route:** `/Account/Login`, `/Account/Register`
- **Original Controller:** `AccountController`
- **Original Database Tables:** `Users`
- **Stored Procedures Used:** `sp_WebLogin`, `sp_UpdatePassword`
- **Roles Allowed:** Public
- **Business Rules:** Registration requires OTP verified via email. 5-min TTL on OTP. Auto sign-in upon registration. Passwords in existing DB are plaintext—must be migrated to bcrypt progressively upon successful login.
- **Expected Result:** Secure authentication with HttpOnly cookies.
- **New Next.js Equivalent:** `/app/(auth)/` and `/api/v1/auth` endpoints.
- **Migration Status:** Pending

#### 2.1.3 Demo Booking
- **Submodule/Page:** Demo Scheduling
- **Original Route:** `/Demo`
- **Original Controller:** `DemoController`
- **Original Database Tables:** `DemoBookings`
- **External Integrations:** Google Calendar API, Zoho Email
- **Business Rules:** Check slot availability against Google Calendar. Create DB record. Send ICS email to user and admin alert. 
- **Validation Rules:** Validate email, phone, and time slot availability.
- **Expected Result:** Seamless booking experience synchronized with calendar.
- **New Next.js Equivalent:** `/app/(public)/demo` and `/api/v1/demo`
- **Migration Status:** Pending

#### 2.1.4 Razorpay Payments & Subscriptions
- **Submodule/Page:** Checkout, Validation, Webhooks
- **Original Route:** `/Payment/Checkout`, `/Payment/Verify`
- **Original Controller:** `PaymentController`
- **Original Database Tables:** `Coupons`, `UserPayments`, `PaymentLogs`
- **External Integrations:** Razorpay
- **Business Rules:** Server-side coupon validation. Razorpay order creation. HMAC signature verification on success. Grant premium access upon successful verification and log funnel events.
- **Validation Rules:** Secure webhook verification. Apply 18% GST calculation correctly.
- **Expected Result:** Safe, validated transaction logging and role update.
- **New Next.js Equivalent:** `/app/(user)/payment` and `/api/v1/payments`
- **Migration Status:** Pending

#### 2.1.5 Referrals
- **Submodule/Page:** Referral Dashboard, Withdrawals, Tracking
- **Original Route:** `/Referral`
- **Original Controller:** `ReferralController`
- **Original Database Tables:** `ReferralClicks`, `Commissions`, `UserReferralProfiles`, `WithdrawalRequests`
- **Stored Procedures Used:** `sp_UpdateUserReferralCode`
- **Business Rules:** Track clicks, calculate commissions based on active subscriptions, validate minimum withdrawal limits based on `ReferralSettings`.
- **Expected Result:** User dashboard showing earnings and allowing bank details update/withdrawal requests.
- **New Next.js Equivalent:** `/app/(user)/referral` and `/api/v1/referrals`
- **Migration Status:** Pending

### 2.2 SuperAdmin & Admin Dashboards (formerly StudyCafeTools_Dashboard)

#### 2.2.1 Admin Authentication & RBAC
- **Submodule/Page:** Admin Login, Permission Enforcement
- **Original Controller:** `HomeController`, `AdminController`
- **Original Database Tables:** `Admins`, *New:* `AdminModulePermissions`
- **Roles Allowed:** Admin, SuperAdmin
- **Business Rules:** SuperAdmins have global access. Admins only have access to modules assigned by SuperAdmin. Permissions must be validated server-side on every API call.
- **Authentication/Authorization Requirements:** Strict HttpOnly session, robust middleware checking RBAC limits.
- **Migration Status:** Pending

#### 2.2.2 User Management & CRM
- **Submodule/Page:** Users List, Premium Grant, Extend Trial, Telemetry
- **Original Route:** `/Users/Index`
- **Original Controller:** `UsersController`
- **Original Database Tables:** `Users`, `UserDevices`, `ModuleAnalyticsLogs`
- **Roles Allowed:** Admin, SuperAdmin
- **Business Rules:** Search/Filter must apply across entire DB via server-side pagination, NOT in-memory. Grant premium supports multi-plan merging of `AllowedModules` JSON arrays.
- **Expected Result:** Performant paginated table with robust filters.
- **New Next.js Equivalent:** `/app/(dashboard)/admin/users` and `/api/v1/users`
- **Migration Status:** Pending

#### 2.2.3 Subscription Plans & Devices
- **Submodule/Page:** Plans CRUD, User Devices
- **Original Controller:** `PlansController`, `DevicesController`
- **Original Database Tables:** `SubscriptionPlans`, `UserDevices`
- **Roles Allowed:** SuperAdmin (Plans), Admin (Devices)
- **Business Rules:** Plans store feature access as JSON array in `AllowedModules`.
- **Migration Status:** Pending

#### 2.2.4 Analytics & Export
- **Submodule/Page:** Dashboards, Excel Export
- **Original Controller:** `AdminController`, `UsersController`
- **Original Database Tables:** `ModuleAnalyticsLogs`, `PaymentLogs`
- **Business Rules:** Excel export must support filtering the entire DB matching current criteria, selecting specific rows, and streaming large datasets without blowing up memory.
- **Migration Status:** Pending

#### 2.2.5 Background Jobs (Subscription Expiry)
- **Submodule/Page:** `SubscriptionExpiryWorker`
- **Original Component:** .NET BackgroundService
- **Original Database Tables:** `Users`, `SubscriptionPlans`
- **External Integrations:** Zoho Email
- **Business Rules:** Run every 2 hours. Send renewal reminders 2 days and 1 day prior to expiry. Use Redis to deduplicate emails and prevent multiple sends for the same period.
- **Expected Result:** Reliable Node.js cron/scheduler with Redis locks.
- **New Next.js Equivalent:** `backend/src/jobs/subscription-expiry.job.ts`
- **Migration Status:** Pending

---

## 3. UI/UX and Design Requirements

- **Design System:** shadcn/ui and Tailwind CSS.
- **Color Palette:** Professional Light Theme.
- **Responsiveness:** Fully mobile, tablet, and desktop compatible.
- **State Management:** Loading skeletons, empty states, confirmation dialogs, and error toasts.
- **Interactions:** Performant micro-interactions without bloating JS payload.

## 4. Security & Compliance

- **Secrets:** All keys (Google, Razorpay, Zoho, Database, JWT/Session secrets) strictly inside `.env`. No fallbacks.
- **Input Validation:** Zod schema validation for all incoming API bodies, queries, and params.
- **Database Safety:** Strict parameterization. Server-side sorting field allowlist. 
- **Exports:** Admin must have explicit permission to export datasets. Role boundaries enforced.

## 5. Testing Requirements

- **Feature Parity Testing:** Validating new implementations against original functionality, specifically around payments, subscriptions, and DB mutations.
- **Pagination & Filters:** Validation of DB-level filtering and Excel exports on large simulated datasets.
- **Security Testing:** API boundaries, IDOR, unauthorized module access attempts.
