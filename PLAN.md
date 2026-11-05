# Student CRUD Application - Project Context & Implementation Plan

## 1. Project Overview & Context
This project entails building a responsive, modern frontend Single Page Application (SPA) using **Vite + React (JavaScript)** styled with **Tailwind CSS** that interfaces with the existing Spring Boot REST API for managing student records.

> **Key Architectural Requirement**: **NO MODALS** will be used. All creation, editing, and confirmation interactions will occur directly on-page using an integrated inline/side-by-side panel layout.

### Existing Backend Context
- **Backend Directory**: `./student` (Spring Boot 3+ with Spring Data JPA & PostgreSQL)
- **Base API Endpoint**: `http://localhost:8080/dizon/students`
- **Database**: PostgreSQL (`db_student`)

### Student Data Model
| Field | Type | Required | Description |
|---|---|---|---|
| `id` | Integer | Auto (backend) | Unique identifier for each student |
| `firstname` | String | Yes | Student's given name |
| `lastname` | String | Yes | Student's surname / family name |
| `course` | String | Yes | Degree program / course of study (e.g., BSIT, BSCS) |
| `section` | String | Yes | Academic class section (e.g., 3A, 2B) |

### Backend API Contract
| Method | Endpoint | Request Body | Response (Success) | Response (Error) |
|---|---|---|---|---|
| `GET` | `/dizon/students` | None | `200 OK` (Array of Student objects) | `500 Internal Error` |
| `GET` | `/dizon/students/{id}` | None | `200 OK` (Single Student object) | `404 Not Found` |
| `POST` | `/dizon/students` | `{ firstname, lastname, course, section }` | `201 Created` (Saved Student) | `400/500 Error` |
| `PUT` | `/dizon/students/{id}` | `{ firstname, lastname, course, section }` | `200 OK` (Updated Student) | `404 Not Found` |
| `DELETE` | `/dizon/students/{id}` | None | `200 OK` ("Student with id {id} deleted.") | `404 Not Found` |

---

## 2. Architecture & Design Decisions

### Tech Stack
- **Build Tool**: Vite (`vite@latest`)
- **Framework**: React 18 / 19 (JavaScript / JSX)
- **Styling**: **Tailwind CSS** (utility-first, responsive, zero-modal layout)
- **HTTP Client**: Native `fetch` with a dedicated API service wrapper
- **Icons**: `lucide-react` for clean iconography

### UI/UX Layout (No Modals)
A responsive two-column / dashboard layout:
- **Left Column / Dedicated Card (Student Form)**:
  - Sticky form that dynamically handles both **Create** and **Edit** modes.
  - In Create mode: Title is "Add New Student" with primary "Save Student" button.
  - In Edit mode: Title updates to "Edit Student (#ID)" with "Update Student" button and a clear "Cancel Edit" button that resets the form back to create mode.
  - Inline validation messages directly below fields.
- **Right Column / Main Area (Student Records & Actions)**:
  - Statistics header (Total Students, Active Courses).
  - Search & filter bar (instant search across first name, last name, course, section).
  - Responsive Tailwind data table listing records.
  - Inline delete confirmation: Clicking "Delete" shows an inline confirmation prompt (`Confirm / Cancel`) directly on the row, preventing accidental deletion without modal popups.
  - Toast banner at the top for real-time success/error alerts.

### CORS & Proxy Strategy
Vite's dev server proxy configured in `vite.config.js`:
```javascript
server: {
  port: 5173,
  proxy: {
    '/dizon': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      secure: false,
    }
  }
}
```

---

## 3. Frontend Project Structure

```
STUDENT-CRUD/
├── PLAN.md                               # Project context & architecture documentation
├── student/                              # Existing Spring Boot backend
└── student-frontend/                     # Vite + React + Tailwind Frontend
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx                # Top header bar with app title and branding
    │   │   ├── StudentForm.jsx           # Inline Add / Edit form (No modals)
    │   │   ├── StudentTable.jsx          # Records table with inline edit & delete actions
    │   │   ├── SearchFilter.jsx          # Live search and course filter bar
    │   │   ├── AlertNotification.jsx     # Feedback toast / banner
    │   │   └── LoadingSkeleton.jsx       # Skeleton loader for fetching states
    │   ├── services/
    │   │   └── studentService.js         # Centralized API service for CRUD operations
    │   ├── App.jsx                       # Main application shell coordinating state
    │   ├── main.jsx                      # React entrypoint
    │   └── index.css                     # Tailwind directives (@tailwind base/components/utilities)
    ├── tailwind.config.js                # Tailwind CSS configuration
    ├── postcss.config.js                 # PostCSS configuration
    ├── index.html
    ├── vite.config.js                    # Vite configuration with proxy
    └── package.json
```

---

## 4. Implementation Steps

1. **Step 1: Scaffold Vite App & Configure Tailwind CSS**:
   - Create `student-frontend` via Vite React template.
   - Install and configure Tailwind CSS (`tailwindcss`, `postcss`, `autoprefixer`).
   - Install `lucide-react`.
   - Setup proxy in `vite.config.js`.

2. **Step 2: API Service Layer**:
   - Create `src/services/studentService.js` mapping all 5 REST operations to `/dizon/students`.

3. **Step 3: Component Implementation (Modal-Free)**:
   - `Navbar.jsx`: App branding & server status indicator.
   - `StudentForm.jsx`: Seamless switching between "Add" and "Edit" modes with inline field validation.
   - `StudentTable.jsx`: Full record listing, inline delete confirmation buttons (`Delete` -> `Confirm? [Yes/No]`).
   - `SearchFilter.jsx`: Search by text & filter by course.
   - `AlertNotification.jsx`: Non-intrusive feedback notifications.

4. **Step 4: State Management & End-to-End Integration**:
   - Manage `students`, `loading`, `error`, `selectedStudentForEdit`, and `alert` states in `App.jsx`.
   - Implement smooth auto-scroll to the form when "Edit" is clicked on any table row.

5. **Step 5: Verification**:
   - Validate full CRUD flow without any modal popups.
   - Test responsive layout across mobile and desktop breakpoints.
