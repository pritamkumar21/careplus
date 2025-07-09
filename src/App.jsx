import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Prescription from './components/Prescription';
import AppointmentBooking from './components/AppointmentBooking';
import Dashboard from './components/Dashboard';

import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appointments, setAppointments] = useState([]); // Track booked appointments

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        
        <Route
          path="/appointment"
          element={
            isLoggedIn ? (
              <AppointmentBooking setAppointments={setAppointments} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard appointments={appointments} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* ✅ New Route for Prescription */}
        <Route
          path="/prescription"
          element={
            isLoggedIn ? (
              <Prescription />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
