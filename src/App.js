import React, { useState } from 'react';
import LoginPage from './LoginPage';
import CalendarView from './CalendarView';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleAppointmentClick = (appointment) => {
    // Handle appointment click (e.g., show details)
    console.log('Appointment clicked:', appointment);
  };

  const handleDateClick = (date) => {
    // Handle date click (e.g., create new appointment)
    console.log('Date clicked:', date);
  };

  return (
    <div className="app">
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <CalendarView 
          appointments={appointments}
          onAppointmentClick={handleAppointmentClick}
          onDateClick={handleDateClick}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default App;