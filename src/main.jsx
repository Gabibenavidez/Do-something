import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { UserProvider } from "./context/userContext.jsx";
import { ActivityProvider } from "./context/activityContext.jsx";
import { ErrorProvider } from "./context/errorContext";

createRoot(document.getElementById("root")).render(
  <ErrorProvider>
    <UserProvider>
      <ActivityProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ActivityProvider>
    </UserProvider>
  </ErrorProvider>
);
