# Frontend API Integration Update Plan

## Overview
Update all frontend API calls to match the new backend API endpoints structure.

## New Backend API Endpoints

### Auth Routes
- `POST /auth/login` - User login, generate JWT (Public)
- `POST /auth/logout` - Clear JWT cookie (Public)

### User Routes (prefix: /users)
- `POST /signup` - Register a new user (Public)
- `GET /users` - Get all users (Public)
- `GET /users/:email` - Get user by email (Auth Self/Admin)
- `PATCH /users/:email` - Update profile (Auth Self/Admin)
- `PATCH /users/:email/role` - Promote user to admin (Auth SuperAdmin)
- `PATCH /users/:email/demote` - Demote admin to user (Auth SuperAdmin)
- `DELETE /users/:email` - Delete a user (Auth Admin)

### Notice Routes (prefix: /notices)
- `GET /notices` - Get all notices (filtered by role/department) (Auth)
- `GET /notices/:id` - Get notice by ID (Auth)
- `POST /notices` - Create a new notice (Auth Admin)
- `PUT /notices/:id` - Update a notice (Auth Admin)
- `DELETE /notices/:id` - Delete a notice (Auth Admin)

### Event Routes (prefix: /events)
- `GET /events` - Get all events (Public)
- `GET /events/:id` - Get specific event by ID (Public)
- `POST /events` - Create new event (Auth Admin)
- `PUT /events/:id` - Update event (Auth Admin)
- `DELETE /events/:id` - Delete event (Auth Admin)

### Upload Routes (prefix: /upload)
- `POST /upload/upload-image` - Upload image to Cloudinary (multipart/form-data with field name "image")

---

## Files to Update (Priority Order)

### 1. Core Configuration Files
- [ ] **src/hooks/useAxiosSecure.js** - Update baseURL to production, logout endpoint from `/logout` to `/auth/logout`

### 2. Authentication Pages
- [ ] **src/Pages/Login/Login.jsx** - Change `/login` to `/auth/login`
- [ ] **src/Pages/Signup/Signup.jsx** - Replace direct fetch calls with axiosSecure:
  - `POST /signup` → `POST /users/signup`
  - `POST /upload-image` → `POST /upload/upload-image`

### 3. User Profile & Data Hooks
- [ ] **src/hooks/userdata/useUserData.js** - Already uses correct endpoint `/users/:email` ✓
- [ ] **src/Pages/Profile/Profile.jsx** - Already uses correct endpoint ✓
- [ ] **src/Pages/Profile/EditProfile.jsx** - Update upload endpoint: `/upload-image` → `/upload/upload-image`

### 4. Notice Pages
- [ ] **src/Pages/Notice/Notice.jsx** - Already uses correct endpoints ✓
- [ ] **src/Pages/Notice/AdminNotice.jsx** - Already uses correct endpoints ✓
- [ ] **src/Pages/Notice/CreateNotice.jsx** - Update upload endpoint: `/upload-image` → `/upload/upload-image`
- [ ] **src/Pages/Notice/EditNotice.jsx** - Update upload endpoint: `/upload-image` → `/upload/upload-image`
- [ ] **src/Pages/Notice/NoticeDetails.jsx** - Already uses correct endpoint ✓

### 5. Event Pages
- [ ] **src/Pages/Events/Events.jsx** - Already uses correct endpoint ✓
- [ ] **src/Pages/Events/AdminEvents.jsx** - Already uses correct endpoints ✓
- [ ] **src/Pages/Events/CreateEvent.jsx** - Update upload endpoint: `/upload-image` → `/upload/upload-image`
- [ ] **src/Pages/Events/EditEvent.jsx** - Update upload endpoint: `/upload-image` → `/upload/upload-image`
- [ ] **src/Pages/Events/ViewEvent.jsx** - Already uses correct endpoint ✓

### 6. Admin User Management
- [ ] **src/Pages/Admin/Users/ManageUsers.jsx** - Already uses correct endpoints ✓
- [ ] **src/Pages/Admin/Users/ManageAdmins.jsx** - Already uses correct endpoints ✓
- [ ] **src/Pages/Admin/SuperDashboard/SuperDashboard.jsx** - Already uses correct endpoints ✓

### 7. Other Pages
- [ ] **src/Pages/ForgotPassword/ForgotPassword.jsx** - Uses Firebase auth directly, no backend API changes needed ✓

---

## Implementation Phases

### Phase 1 - Core Auth
- Update useAxiosSecure.js (baseURL + logout endpoint)
- Update Login.jsx (/login → /auth/login)
- Update Signup.jsx (fetch → axiosSecure, /signup → /users/signup, /upload-image → /upload/upload-image)

### Phase 2 - Image Uploads
- Update EditProfile.jsx
- Update CreateNotice.jsx
- Update EditNotice.jsx
- Update CreateEvent.jsx
- Update EditEvent.jsx

### Phase 3 - Verification
- Test all auth flows, profile, notices, events, admin features

---

## Git Workflow
After each phase completion:
1. `git add .`
2. `git commit -m "<type>: <description>"` (conventional commit)
3. `git push`