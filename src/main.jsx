import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/authcontext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { DocumentProvider } from "./context/DocumentContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <DocumentProvider>
          <App />
        </DocumentProvider>
      </UserProvider>
    </AuthProvider>
  </StrictMode>
);
