# kgpTinder

🔥 **Tinder for KGPians** – A full-stack dating and networking application tailored specifically for the students of IIT Kharagpur.

## 🚀 Features

- **User Authentication:** Secure signup and login with JWT and bcrypt password hashing.
- **Dynamic Feed:** Browse through profiles, filtering out users you've already interacted with.
- **Connection Requests:** Swipe right (Interested) or left (Pass) on profiles. Accept or reject incoming requests.
- **Real-Time Chat:** Integrated Socket.io for live, instant messaging with your accepted connections.
- **Profile Customization:** Edit your bio, age, gender, dating preferences, and profile photo.
- **Responsive UI:** Modern, dark-themed user interface built with TailwindCSS and DaisyUI.

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- Redux Toolkit (State Management)
- TailwindCSS & DaisyUI (Styling)
- React Router (Navigation)
- Socket.io-client (Real-time events)
- Axios

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose (Database & ORM)
- Socket.io (WebSocket Server)
- JWT (JSON Web Tokens for Auth)
- bcryptjs (Encryption)

## 📁 Project Structure

The project uses a monorepo architecture:
```text
kgpTinder/
├── Backend/                 # Express REST API & Socket server
│   ├── config/              # MongoDB connection setup
│   ├── middlewares/         # JWT Auth middleware
│   ├── models/              # Mongoose schemas (User, Chat, ConnectionRequest)
│   ├── routes/              # API Endpoints (Auth, Profile, Feed, Requests, Chat)
│   └── utils/               # Socket initialization & Validation utilities
│
└── Front-end/               # React Vite Application
    └── kgpTinder-web/
        ├── src/components/  # React UI Components
        └── src/utils/       # Redux slices, constants, and socket setup
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- A MongoDB cluster/local instance

### 1. Clone the repository
```bash
git clone https://github.com/PriyanshuPathakk/kgpTinder.git
cd kgpTinder
```

### 2. Configure Environment Variables
You need to create two `.env` files.

**Backend (`Backend/.env`):**
```env
DB_CONNECTION_STRING=mongodb+srv://<your_username>:<your_password>@cluster.mongodb.net/kgpTinder
TOKEN_KEY=your_super_secret_jwt_key
```

**Frontend (`Front-end/kgpTinder-web/.env.development`):**
```env
VITE_BACKEND_URL=http://localhost:3333
```

### 3. Install Dependencies
Install packages for both the backend and frontend simultaneously:
```bash
# In the root kgpTinder directory
npm install
npm run install:all
```

### 4. Run the Application
Start both the backend server and frontend Vite dev server concurrently:
```bash
npm run dev
```

- Frontend will be live at: `http://localhost:5173`
- Backend API will run on: `http://localhost:3333`

---
*Built with ❤️ for KGPians.*
