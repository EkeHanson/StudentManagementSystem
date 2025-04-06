# 🎓 Student Management System (SMS) for Excel International Excellent Schools  

A comprehensive **React-based web application** designed to streamline administrative tasks, manage student records, and enhance communication between students, teachers, parents, and administrators.  

## 🚀 Features  

### 🔒 User Management & Authentication  
- Role-based access control (Admin, Teachers, Students, Parents)  
- Secure login, password reset, and optional multi-factor authentication  
- User profile management  

### 👩‍🎓 Student Management  
- Register and manage detailed student profiles  
- Class and section assignment  
- Attendance tracking and reporting  
- ID card generation  
- Progress reports and disciplinary records  

### 👩‍🏫 Teacher Management  
- Teacher profile management  
- Class assignments  
- Teacher attendance tracking  

### 🧑‍🤝‍🧑 Parent Portal  
- Academic performance and attendance overview  
- Fee payments and messaging system  

### 📚 Academic Management  
- Timetable creation and management  
- Examination scheduling and grading system  
- Homework and assignment tracking  

### 🕒 Attendance Management  
- Student and teacher attendance tracking  
- Notifications for absences and tardiness  

### 💰 Fee Management  
- Fee structure creation and online payments  
- Fee receipts and payment tracking  

### 📖 Library Management  
- Catalog and book issue/return system  
- Digital library for eBooks and resources  

### 🚌 Transport Management  
- Bus route and schedule management  
- Real-time GPS tracking for buses (optional)  

### 🧪 Laboratory Management  
- Lab inventory, scheduling, and attendance tracking  
- Experiment assignment and performance evaluation  

### 📅 Event & Calendar Management  
- School calendar and event participation tracking  

### 📈 Reports & Analytics  
- Attendance, fee, and academic performance reports  
- Detailed teacher and student performance analytics  

---

## 📁 Project Structure  

```plaintext  src/
├── assets/                  # Static assets (images, fonts, etc.)
│
├── components/              # Reusable UI components
│   ├── auth/                # Authentication components
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   ├── ForgotPasswordForm.jsx
│   │   └── ResetPasswordForm.jsx
│   │
│   ├── dashboard/           # Dashboard components
│   │   ├── AdminStats.jsx
│   │   ├── DashboardLayout.jsx
│   │   ├── TeacherClasses.jsx
│   │   ├── StudentOverview.jsx
│   │   └── ParentView.jsx
│   │
│   ├── shared/             # Shared UI components
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── ErrorMessage.jsx
│   │
│   └── user/               # User management components
│       ├── ProfileForm.jsx
│       └── AvatarUploader.jsx
│
├── context/                # Context providers
│   ├── AuthContext.jsx
│   └── AppContext.jsx
│
├── hooks/                  # Custom hooks
│   ├── useAuth.js
│   └── useApi.js
│
├── pages/                  # Page components
│   ├── auth/               # Authentication pages
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ForgotPassword.jsx
│   │   └── ResetPassword.jsx
│   │
│   ├── dashboard/          # Role-specific dashboards
│   │   ├── AdminDashboard.jsx
│   │   ├── TeacherDashboard.jsx
│   │   ├── StudentDashboard.jsx
│   │   └── ParentDashboard.jsx
│   │
│   ├── user/              # User management pages
│   │   ├── Profile.jsx
│   │   └── Settings.jsx
│   │
│   ├── errors/            # Error pages
│   │   ├── NotFound.jsx
│   │   └── Unauthorized.jsx
│   │
│   └── Home.jsx           # Landing page
│
├── services/              # API services
│   ├── auth.service.js
│   ├── user.service.js
│   ├── student.service.js
│   ├── teacher.service.js
│   └── api.js             # Axios instance
│
├── utils/                 # Utility functions
│   ├── constants.js       # App constants
│   ├── helpers.js         # Helper functions
│   └── validators.js      # Validation functions
│
├── styles/                # Global styles
│   ├── globals.css        # Global CSS
│   └── tailwind.css       # Tailwind imports
│
├── App.jsx                # Main app component
└── main.jsx               # App entry point  
```  

---

## ⚙️ Installation  

1. Clone the repository:  
   ```bash  
   git clone https://github.com/yourusername/student-management-system.git  
   ```  

2. Navigate to the project directory:  
   ```bash  
   cd student-management-system  
   ```  

3. Install dependencies:  
   ```bash  
   npm install  
   ```  

4. Start the development server:  
   ```bash  
   npm run dev  
   ```  

The application will run at `http://localhost:5173/`.  

---

## 🔑 Environment Variables  

Create a `.env` file in the root directory and configure the following variables:  
```env  
REACT_APP_API_URL=http://your-api-url.com  
REACT_APP_AUTH_KEY=your-auth-key  
REACT_APP_MAPS_API_KEY=your-maps-api-key  
```  

---

## 🧩 Technologies Used  

- **Frontend**: React, React Router, Context API  
- **UI Library**: Tailwind CSS / Material-UI  
- **State Management**: Context API  
- **Charts**: Chart.js or Recharts  
- **Backend**: Compatible with REST APIs (Node.js, Django, etc.)  

---

## 📜 Features in Progress  

- Real-time GPS tracking for buses  
- Mobile app integration with push notifications  
- Multi-school branch support  

---

## 🤝 Contributions  

Contributions are welcome! Please follow these steps:  
1. Fork the repository  
2. Create a new branch: `git checkout -b feature-name`  
3. Commit your changes: `git commit -m "Add feature name"`  
4. Push to the branch: `git push origin feature-name`  
5. Open a pull request  

---

## 📧 Contact  

For questions or support, please email: **support@excelinternational.com**  

---

## 📄 License  

This project is licensed under the **appBrew Tech Team**. 🎓  
