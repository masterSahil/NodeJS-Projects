<div align="center">
  <img src="./frontend/public/favicon.png" alt="Smart Society Logo" width="100" />
  <h1>Smart Society Management System 🏙️</h1>
  <p><em>A comprehensive, full-stack web application designed to digitize and streamline the management of residential societies, apartment complexes, and gated communities.</em></p>
</div>

---

## 🌟 Executive Summary

The system provides dedicated portals for **Administrators**, **Residents**, **Security**, and **Maintenance** staff. It features a sleek, futuristic glassmorphism design aesthetic built with React, Tailwind CSS, and Node.js.

By digitizing daily operations, this application drastically reduces administrative overhead, ensures airtight security, and creates a seamless living experience for residents.

---

## 📸 Role-Based Dashboards & Flows

Our application is built around strict Role-Based Access Control. Each user gets a personalized dashboard tailored to their specific operational needs.

### 🛡️ Administrator Portal
**Capabilities:** Full control over the entire society structure. Admins can manage residents, approve flats, generate bills, broadcast notices, and oversee all complaint resolutions.

<div align="center" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; margin-top: 15px;">
  <img src="docs/admin_dashboard.png" alt="Admin Dashboard" width="45%" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
  <img src="docs/admin_residents.png" alt="Manage Residents" width="45%" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
  <img src="docs/admin_add_resident.png" alt="Add Resident" width="45%" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
  <img src="docs/admin_bills.png" alt="Billing Management" width="45%" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
  <img src="docs/admin_polls.png" alt="Polls Management" width="45%" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
</div>

<br/>

### 🏠 Resident Portal
**Capabilities:** A dedicated space for residents to pay maintenance bills, log facility complaints, pre-approve visitors to bypass security checks, and participate in society polls.

<div align="center" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; margin-top: 15px;">
  <img src="docs/resident_dashboard.png" alt="Resident Dashboard" width="45%" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
  <img src="docs/resident_complaints.png" alt="View Complaints" width="45%" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
  <img src="docs/resident_add_complaint.png" alt="Raise Complaint" width="45%" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
  <img src="docs/resident_facilities.png" alt="Facilities Booking" width="45%" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
</div>

<br/>

### 👮 Security Portal
**Capabilities:** A specialized interface for the security gate. Guards can log visitor entries and exits in real-time, view resident pre-approvals, and manage vehicle logs.

<div align="center" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; margin-top: 15px;">
  <img src="docs/security_dashboard.png" alt="Security Dashboard" width="45%" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
  <img src="docs/security_visitors.png" alt="Visitor Logs" width="45%" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
  <img src="docs/security_vehicles.png" alt="Vehicle Logs" width="45%" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
</div>

<br/>

### 🔧 Maintenance Portal
**Capabilities:** Focused view for service staff (plumbers, electricians). Staff members can view their assigned work orders, update the status, and mark complaints as resolved.

<div align="center" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; margin-top: 15px;">
  <img src="docs/maintenance_dashboard.png" alt="Maintenance Dashboard" width="45%" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
  <img src="docs/maintenance_work_orders.png" alt="Work Orders" width="45%" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
</div>

<br/>

### 👤 Common Views & Authentication Flow
Universal pages shared across roles, and a sleek, animated login portal with a robust OTP-based "Forgot Password" integration.

<div align="center" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; margin-top: 15px;">
  <img src="docs/common_profile.png" alt="User Profile" width="30%" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
  <img src="docs/login_page.png" alt="Login Page" width="30%" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
  <img src="docs/forgot_password_page.png" alt="Forgot Password Page" width="30%" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
</div>

---

## 🛠️ Technology Stack

| Frontend Architecture | Backend Architecture | Database & Tooling |
| :--- | :--- | :--- |
| **React 19 (Vite)** | **Node.js & Express.js** | **MongoDB (Mongoose ODM)** |
| **Tailwind CSS v4** | **JSON Web Tokens (JWT)** | **Nodemailer (SMTP)** |
| **Framer Motion** | **Bcrypt.js (Hashing)** | **React Hot Toast** |
| **React Router v7** | **RESTful API Design** | **Lucide React Icons** |

---

## 🎨 Design Philosophy

The UI was meticulously crafted to provide a **Premium, Futuristic Experience**. 
We completely avoided generic Bootstrap-style themes in favor of:
- 🧊 **Glassmorphism**: Translucent panels with subtle background blurs.
- 🌈 **Dynamic Neon Accents**: Cyber-cyan and purple interactive elements.
- ✨ **Micro-animations**: Smooth transitions on route changes, button hovers, and toast notifications.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB running locally or a MongoDB Atlas URI

### 1. Clone & Install
Clone the repository and install dependencies for both the frontend and backend.

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd frontend
npm install
```

### 2. Environment Setup
Create a `.env` file in the `backend` directory with the following variables:

```env
MONGO_URI=mongodb://localhost:27017/smart-society
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key

# For Forgot Password OTPs
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 3. Run the Application
You can run both servers concurrently.

**Start the Backend:**
```bash
cd backend
npm run dev
```

**Start the Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`.

---

<div align="center">
  <p>Built with ❤️ for Modern Living</p>
</div>
