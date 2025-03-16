# DocuMind AI

## 📑 Overview

DocuMind AI is an intelligent document management platform that helps users extract insights, answer questions, and understand complex documents through the power of artificial intelligence.

## ✨ Features

- **Document Upload** - Upload PDF and DOCX files for AI processing
- **Chat with Documents** - Have natural conversations about your document content
- **Q&A Engine** - Get precise answers to your specific questions about documents
- **Smart Summaries** - Get concise summaries of lengthy documents
- **Secure Authentication** - User authentication with email/password and Google sign-in
- **Responsive Design** - Modern UI that works on desktop and mobile devices

## 🛠️ Technology Stack

- **Frontend**: React.js, Tailwind CSS
- **Authentication**: Firebase Authentication
- **State Management**: React Context API
- **Routing**: React Router
- **Styling**: TailwindCSS with custom gradient styles
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/documind-ui.git
   cd documind-ui
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with your Firebase configuration

   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

4. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open `http://localhost:5173` in your browser

## 📂 Project Structure

```
documind-ui/
├── public/
├── src/
│   ├── assets/         # Static assets like images and icons
│   ├── components/     # Reusable UI components
│   │   └── ui/         # Base UI components (Button, Input, etc.)
│   ├── config/         # Configuration files
│   ├── context/        # React context providers
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Application pages
│   ├── services/       # API services and Firebase integration
│   ├── App.jsx         # Main application component
│   ├── App.css         # Application styles
│   ├── index.css       # Global styles
│   └── main.jsx        # Entry point
├── .env                # Environment variables
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.js      # Vite configuration
```

## 🔐 Authentication

DocuMind AI uses Firebase Authentication for user management:

- Email/Password authentication
- Google Sign-in
- Error handling for common authentication scenarios
- Protected routes for authenticated users

## 📱 Responsive Design

The application is designed to work on various screen sizes:

- Mobile-friendly layouts
- Responsive UI components
- Adaptive navigation

## 🖌️ UI/UX Features

- Modern gradient-based design
- Interactive hover and focus states
- Loading indicators for async operations
- Form validation with error messages
- Dark mode support

## 🙏 Acknowledgments

- [Firebase](https://firebase.google.com/) - Authentication and Backend services
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React](https://reactjs.org/) - Frontend library
- [Vite](https://vitejs.dev/) - Frontend tooling
