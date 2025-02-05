import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import HomePage from "./pages/HomePage.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import BookingsCalendar from "./pages/BookingCalendar.jsx";
function App() {
  return (
    <Router>
      <Navbar/>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/booking" element={<BookingsCalendar/>} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
