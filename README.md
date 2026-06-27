# Appointy - Doctor Appointment System

Appointy is a full-stack MERN application for booking and managing doctor appointments.
It has three role-based interfaces:

- Patient app (frontend)
- Doctor/Admin dashboard (admin)
- REST API server (backend)

The project supports JWT-based authentication, appointment workflows, doctor management, and payment mode handling (UPI and cash).

## Tech Stack

- React + Vite (frontend and admin apps)
- Node.js + Express (backend API)
- MongoDB + Mongoose
- Cloudinary (optional media upload)

## Repository Structure

This repository is organized as three apps:

- frontend: Patient-facing React app
- admin: Admin and doctor React app
- backend: Express API server

## Prerequisites

- Node.js 18+ (recommended)
- npm
- MongoDB connection string

## 1) Install Dependencies

From project root, install dependencies in each app:

    cd backend
    npm install

    cd ../frontend
    npm install

    cd ../admin
    npm install

## 2) Configure Environment Variables

Create these files:

- backend/.env
- frontend/.env
- admin/.env

Use the following templates.

backend/.env

    PORT=4000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret

    ADMIN_EMAIL=admin@example.com
    ADMIN_PASSWORD=your_admin_password

    CLOUDINARY_ENABLED=true
    CLOUDINARY_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_SECRET_KEY=your_api_secret

frontend/.env

    VITE_BACKEND_URL=http://localhost:4000
    VITE_UPI_ID=your_upi_id
    VITE_UPI_NAME=your_display_name

admin/.env

    VITE_BACKEND_URL=http://localhost:4000
    VITE_CURRENCY=INR

Notes:

- If Cloudinary credentials are missing, upload features are disabled gracefully.
- Do not commit real secrets to GitHub.

## 3) Run the Applications

Start all three services in separate terminals.

Terminal 1 (backend)

    cd backend
    npm run server

Terminal 2 (frontend)

    cd frontend
    npm run dev

Terminal 3 (admin)

    cd admin
    npm run dev

## Default Local URLs

- Backend API: http://localhost:4000
- Frontend app: http://localhost:5173
- Admin app: typically http://localhost:5174 (or next available Vite port)

## Key Features

- User registration/login and profile management
- Doctor listing and appointment booking
- Payment mode selection (cash/UPI)
- Admin management for doctors and appointments
- Doctor dashboard for appointment handling and profile updates

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

## License

This project is currently shared without an explicit license file. Add a LICENSE file if you want to define usage permissions.
