import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Home } from "./pages/Home.jsx";
import { SignUpPage } from "./pages/SignUp.jsx";
import { SignInPage } from "./pages/SignIn.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/sign-up" element={<SignUpPage />} />
        <Route path="/auth/sign-in" element={<SignInPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
