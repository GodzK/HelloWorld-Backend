import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import HomePage from "./pages/HomePage.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
function App() {
  return (
    <Router>
      <Navbar/>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
