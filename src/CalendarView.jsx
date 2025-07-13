import React, { useState, useEffect } from 'react';
import './CalendarView.css';
import AddAppointmentForm from './AddAppointmentForm';

// Icons
const ChevronLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const FilterIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
  </svg>
);

const SunIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

// Utility functions
const formatDate = (date) => {
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

const isSameDay = (date1, date2) => {
  return date1.toDateString() === date2.toDateString();
};

const getDaysInMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  const days = [];
  const current = new Date(startDate);
  
  for (let i = 0; i < 42; i++) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  
  return days;
};

const CalendarView = ({ onLogout }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedMobileDate, setSelectedMobileDate] = useState(new Date());
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedFormDate, setSelectedFormDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    doctor: '',
    patient: ''
  });

  // Fixed lists for filtering
  const doctors = [
    'Dr. Smith', 'Dr. Johnson', 'Dr. Williams', 'Dr. Brown', 
    'Dr. Davis', 'Dr. Wilson', 'Dr. Anderson'
  ];

  const patients = [
    'John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis',
    'Robert Wilson', 'Lisa Anderson', 'David Miller', 'Jennifer Taylor'
  ];

  // Load dark mode preference and appointments from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('clinicDarkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }

    const savedAppointments = localStorage.getItem('clinicAppointments');
    if (savedAppointments) {
      try {
        setAppointments(JSON.parse(savedAppointments));
      } catch (error) {
        console.error('Error loading appointments from localStorage:', error);
        setAppointments([]);
      }
    } else {
      // Initialize with some sample data
      const sampleAppointments = [
        {
          id: 1,
          date: new Date().toISOString().split('T')[0],
          time: '10:00',
          patientName: 'John Smith',
          doctorName: 'Dr. Johnson',
          reason: 'Regular checkup',
          status: 'Scheduled'
        }
      ];
      setAppointments(sampleAppointments);
      localStorage.setItem('clinicAppointments', JSON.stringify(sampleAppointments));
    }
  }, []);

  // Save preferences and appointments to localStorage
  useEffect(() => {
    localStorage.setItem('clinicDarkMode', JSON.stringify(darkMode));
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('clinicAppointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getAppointmentsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    let filteredAppointments = appointments.filter(apt => apt.date === dateStr);
    
    // Apply filters
    if (filters.doctor) {
      filteredAppointments = filteredAppointments.filter(apt => 
        apt.doctorName === filters.doctor
      );
    }
    
    if (filters.patient) {
      filteredAppointments = filteredAppointments.filter(apt => 
        apt.patientName === filters.patient
      );
    }
    
    return filteredAppointments;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const navigateDay = (direction) => {
    const newDate = new Date(selectedMobileDate);
    newDate.setDate(newDate.getDate() + direction);
    setSelectedMobileDate(newDate);
  };

  const isToday = (date) => {
    return isSameDay(date, new Date());
  };

  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const handleDateClick = (date) => {
    setSelectedFormDate(date);
    setShowAddForm(true);
  };

  const handleSaveAppointment = (newAppointment) => {
    setAppointments(prev => [...prev, newAppointment]);
    setShowAddForm(false);
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
  };

  const handleAppointmentClick = (appointment) => {
    // Handle appointment click - could show details, edit, etc.
    console.log('Clicked appointment:', appointment);
  };

  const handleDeleteAppointment = (appointmentId) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      doctor: '',
      patient: ''
    });
  };

  const hasActiveFilters = filters.doctor || filters.patient;

  const getDoctorClassName = (doctorName) => {
    return `doctor-${doctorName.replace(/\s+/g, '-').replace(/\./g, '')}`;
  };

  const FilterPanel = () => (
    <div className={`filter-panel ${showFilters ? 'show' : ''}`}>
      <div className="filter-header">
        <h3>Filter Appointments</h3>
        <button className="close-filter" onClick={() => setShowFilters(false)}>×</button>
      </div>
      
      <div className="filter-group">
        <label>Filter by Doctor:</label>
        <select 
          value={filters.doctor} 
          onChange={(e) => handleFilterChange('doctor', e.target.value)}
        >
          <option value="">All Doctors</option>
          {doctors.map(doctor => (
            <option key={doctor} value={doctor}>{doctor}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Filter by Patient:</label>
        <select 
          value={filters.patient} 
          onChange={(e) => handleFilterChange('patient', e.target.value)}
        >
          <option value="">All Patients</option>
          {patients.map(patient => (
            <option key={patient} value={patient}>{patient}</option>
          ))}
        </select>
      </div>

      <div className="filter-actions">
        <button className="clear-filters-btn" onClick={clearFilters}>
          Clear Filters
        </button>
        {hasActiveFilters && (
          <div className="active-filters">
            {filters.doctor && <span className="filter-tag">Doctor: {filters.doctor}</span>}
            {filters.patient && <span className="filter-tag">Patient: {filters.patient}</span>}
          </div>
        )}
      </div>
    </div>
  );

  const DesktopCalendar = () => (
    <div className="calendar-widget">
      <div className="calendar-header">
        <button className="nav-button" onClick={() => navigateMonth(-1)}>
          <ChevronLeftIcon />
        </button>
        <h2 className="calendar-header-title">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button className="nav-button" onClick={() => navigateMonth(1)}>
          <ChevronRightIcon />
        </button>
      </div>
      
      <div className="week-header">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="week-day">{day}</div>
        ))}
      </div>
      
      <div className="calendar-grid">
        {days.map((day, index) => {
          const dayAppointments = getAppointmentsForDate(day);
          const cellClasses = [
            'day-cell',
            isToday(day) ? 'today' : '',
            !isCurrentMonth(day) ? 'other-month' : '',
            dayAppointments.length > 0 ? 'has-appointments' : ''
          ].filter(Boolean).join(' ');
          
          return (
            <div
              key={index}
              className={cellClasses}
              onClick={() => handleDateClick(day)}
            >
              <div className="day-number">{day.getDate()}</div>
              {dayAppointments.slice(0, 3).map(appointment => (
                <div
                  key={appointment.id}
                  className={`appointment ${getDoctorClassName(appointment.doctorName)}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAppointmentClick(appointment);
                  }}
                  title={`${appointment.time} - ${appointment.patientName} with ${appointment.doctorName}\nReason: ${appointment.reason}`}
                >
                  <span className="appointment-time">{appointment.time}</span> 
                  <span className="appointment-patient">{appointment.patientName}</span>
                  <button 
                    className="appointment-delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAppointment(appointment.id);
                    }}
                    title="Delete appointment"
                  >
                    ×
                  </button>
                </div>
              ))}
              {dayAppointments.length > 3 && (
                <div 
                  className="more-appointments"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDateClick(day);
                  }}
                >
                  +{dayAppointments.length - 3} more
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const MobileCalendar = () => (
    <div className="calendar-widget">
      <div className="calendar-header">
        <button className="nav-button" onClick={() => navigateDay(-1)}>
          <ChevronLeftIcon />
        </button>
        <h2 className="calendar-header-title">
          {formatDate(selectedMobileDate)}
        </h2>
        <button className="nav-button" onClick={() => navigateDay(1)}>
          <ChevronRightIcon />
        </button>
      </div>
      
      <div className="mobile-container">
        <input
          type="date"
          value={selectedMobileDate.toISOString().split('T')[0]}
          onChange={(e) => setSelectedMobileDate(new Date(e.target.value))}
          className={`mobile-date-picker ${isToday(selectedMobileDate) ? 'today' : ''}`}
        />
        
        <div className="mobile-day">
          <div className="mobile-day-header">
            Appointments ({getAppointmentsForDate(selectedMobileDate).length})
          </div>
          {getAppointmentsForDate(selectedMobileDate).length === 0 ? (
            <p className="no-appointments">No appointments scheduled</p>
          ) : (
            getAppointmentsForDate(selectedMobileDate).map(appointment => (
              <div
                key={appointment.id}
                className={`mobile-appointment ${getDoctorClassName(appointment.doctorName)}`}
                onClick={() => handleAppointmentClick(appointment)}
              >
                <div className="mobile-appointment-header">
                  <div className="mobile-appointment-time">{appointment.time}</div>
                  <button 
                    className="mobile-appointment-delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAppointment(appointment.id);
                    }}
                    title="Delete appointment"
                  >
                    ×
                  </button>
                </div>
                <div className="mobile-appointment-patient">{appointment.patientName}</div>
                <div className="mobile-appointment-doctor">{appointment.doctorName}</div>
                {appointment.reason && (
                  <div className="mobile-appointment-reason">{appointment.reason}</div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      
      <button
        className="add-button"
        onClick={() => handleDateClick(selectedMobileDate)}
      >
        <PlusIcon />
      </button>
    </div>
  );

  return (
    <div className={`calendar-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="top-bar">
        <div className="logo">
          <CalendarIcon />
          Clinic Appointments
        </div>
        
        <div className="top-bar-actions">
          <button 
            className={`filter-toggle ${hasActiveFilters ? 'has-filters' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
            title="Filter appointments"
          >
            <FilterIcon />
            {hasActiveFilters && <span className="filter-count">{Object.values(filters).filter(v => v).length}</span>}
          </button>
          
          <button 
            className="dark-mode-toggle"
            onClick={toggleDarkMode}
            title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
          
          <button className="logout-button" onClick={onLogout}>
            <LogoutIcon />
            Logout
          </button>
        </div>
      </div>

      <FilterPanel />

      {isMobile ? <MobileCalendar /> : <DesktopCalendar />}

      {showAddForm && (
        <AddAppointmentForm
          selectedDate={selectedFormDate}
          onSave={handleSaveAppointment}
          onCancel={handleCancelAdd}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default CalendarView;