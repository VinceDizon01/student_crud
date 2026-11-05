# Student CRUD Application

A full-stack student management application featuring a **Spring Boot REST API** and a **Vite + React (JavaScript) + Tailwind CSS** frontend, configured for continuous deployment on **Render.com**.

## 🚀 Architecture Highlights

- **Frontend**: Vite + React (JavaScript) styled with **Tailwind CSS** in `./frontend`.
- **No Modals**: 100% modal-free user experience:
  - Form dynamically toggles between **"Add New Student"** and **"Edit Student (#ID)"** modes.
  - Delete actions feature an **inline confirmation prompt** directly on each table row (`Confirm / Cancel`).
  - Search & filter updates live in real-time.
- **Backend**: Spring Boot 3 with Spring Data JPA & PostgreSQL in `./student`.
  - Configured with `@CrossOrigin(origins = "*")`.
  - Multi-stage Docker build ready for containerized deployment.
- **Render.com Deployment**: Automated via Infrastructure-as-Code [render.yaml](render.yaml):
  - **`student-backend`**: Dockerized Spring Boot web service.
  - **`student-frontend`**: Static web service built from `./frontend`.
  - **`student-db`**: Managed PostgreSQL database instance.

---

## 📁 Repository Structure

```
STUDENT-CRUD/
├── render.yaml                # Render Blueprint deployment configuration
├── .gitignore                 # Git ignore rules
├── PLAN.md                    # Architecture and implementation plan
├── README.md                  # Project overview and run guide
├── student/                   # Spring Boot REST API
│   ├── Dockerfile             # Multi-stage Eclipse Temurin JDK Dockerfile
│   ├── src/main/java/com/dizon/student/
│   │   ├── Student.java           # Student JPA Entity
│   │   ├── StudentController.java # CRUD Endpoints (/dizon/students)
│   │   └── StudentRepository.java # JPA Repository
│   ├── src/main/resources/
│   │   └── application.properties # Dynamic DB & Port config (Local & Render)
│   └── pom.xml
└── frontend/                  # Vite React + Tailwind Frontend
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx         # Header branding & metrics
    │   │   ├── StudentForm.jsx    # Inline Create / Edit form (No modals)
    │   │   ├── StudentTable.jsx   # Records table with inline actions
    │   │   ├── SearchFilter.jsx   # Keyword search & course dropdown
    │   │   ├── AlertBanner.jsx    # Feedback alert banner
    │   │   └── LoadingSkeleton.jsx# Loading skeleton loader
    │   ├── services/
    │   │   └── studentService.js  # REST API Client (supports Render & Local proxy)
    │   ├── App.jsx                # Main application state orchestrator
    │   └── index.css              # Tailwind CSS directives
    ├── vite.config.js             # Vite proxy configuration
    ├── tailwind.config.js
    └── package.json
```

---

## 🌐 Deploying to Render.com

This project uses Render's **Blueprints (`render.yaml`)** for zero-configuration, one-click deployments.

### Steps to Deploy:

1. **Push your project to GitHub**:
   ```bash
   git push -u origin main
   ```

2. **Go to Render.com**:
   - Log into your [Render Dashboard](https://dashboard.render.com).
   - Click **New +** and select **Blueprint**.
   - Connect your GitHub repository (`student_crud`).
   - Render will automatically detect `render.yaml` and provision:
     - 🗄️ **`student-db`**: Free PostgreSQL database (`db_student`).
     - ⚙️ **`student-backend`**: Dockerized Spring Boot service automatically linked to `student-db`.
     - 💻 **`student-frontend`**: Static site built with Vite & Tailwind, automatically linked to `student-backend`.
   - Click **Apply**.

---

## 💻 Local Development

### 1. Start the Backend API (Spring Boot)
Ensure PostgreSQL is running locally with database `db_student`:
```bash
cd student
.\mvnw.cmd spring-boot:run
```
The API will be available at `http://localhost:8080/dizon/students`.

### 2. Start the Frontend (Vite + React)
```bash
cd frontend
npm run dev
```
Open your browser at `http://localhost:5173`.
