// src/App.jsx
import React from "react";
import MainPage from "./pages/mainPage";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <MainPage />
    </AuthProvider>
  );
}

export default App;
