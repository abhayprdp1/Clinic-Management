import React, { useState } from 'react';
import './AddAppointmentForm.css';

const AddAppointmentForm = ({ selectedDate, onSave, onCancel, darkMode }) => {
  // Fixed list of patients and doctors
  const patients = [
    { id: 1, name: 'John Smith', phone: '(555) 123-4567' },
    { id: 2, name: 'Sarah Johnson', phone: '(555) 234-5678' },
    { id: 3, name: 'Michael Brown', phone: '(555) 345-6789' },
    { id: 4, name: 'Emily Davis', phone: '(555) 456-7890' },
    { id: 5, name: 'Robert Wilson', phone: '(555) 567-8901' },
    { id: 6, name: 'Lisa Anderson', phone: '(555) 678-9012' },
    { id: 7, name: 'David Miller', phone: '(555) 789-0123' },
    { id: 8, name: 'Jennifer Taylor', phone: '(555) 890-1234' },
  ];

  const doctors = [
    { id: 1, name: 'Dr. Smith', specialty: 'General Practice' },
    { id: 2, name: 'Dr. Johnson', specialty: 'Cardiology' },
    { id: 3, name: 'Dr. Williams', specialty: 'Pediatrics' },
    { id: 4, name: 'Dr. Brown', specialty: 'Orthopedics' },
    { id: 5, name: 'Dr. Davis', specialty: 'Dermatology' },
    { id: 6, name: 'Dr. Wilson', specialty: 'Neurology' },
    { id: 7, name: 'Dr. Anderson', specialty: 'Psychiatry' },
  ];

  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    time: '09:00',
    reason: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.patientId) {
      newErrors.patientId = 'Please select a patient';
    }
    
    if (!formData.doctorId) {
      newErrors.doctorId = 'Please select a doctor';
    }
    
    if (!formData.time) {
      newErrors.time = 'Please select a time';
    }
    
    if (!formData.reason.trim()) {
      newErrors.reason = 'Please enter a reason for the appointment';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const selectedPatient = patients.find(p => p.id === parseInt(formData.patientId));
    const selectedDoctor = doctors.find(d => d.id === parseInt(formData.doctorId));

    const appointment = {
      id: Date.now(),
      date: selectedDate.toISOString().split('T')[0],
      time: formData.time,
      patientName: selectedPatient.name,
      patientPhone: selectedPatient.phone,
      doctorName: selectedDoctor.name,
      doctorSpecialty: selectedDoctor.specialty,
      reason: formData.reason.trim(),
      status: 'Scheduled',
      createdAt: new Date().toISOString()
    };

    onSave(appointment);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className={`add-appointment-modal ${darkMode ? 'dark-mode' : ''}`} onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Appointment</h2>
          <button className="close-button" onClick={onCancel}>×</button>
        </div>
        
        <p className="appointment-date">
          Date: <strong>{formatDate(selectedDate)}</strong>
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="patientId">Patient *</label>
            <select
              id="patientId"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              className={errors.patientId ? 'error' : ''}
            >
              <option value="">Select a patient</option>
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.name} - {patient.phone}
                </option>
              ))}
            </select>
            {errors.patientId && <span className="error-message">{errors.patientId}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="doctorId">Doctor *</label>
            <select
              id="doctorId"
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              className={errors.doctorId ? 'error' : ''}
            >
              <option value="">Select a doctor</option>
              {doctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialty}
                </option>
              ))}
            </select>
            {errors.doctorId && <span className="error-message">{errors.doctorId}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="time">Time *</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              min="08:00"
              max="18:00"
              className={errors.time ? 'error' : ''}
            />
            {errors.time && <span className="error-message">{errors.time}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="reason">Reason for Visit *</label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Enter the reason for this appointment..."
              rows="3"
              className={errors.reason ? 'error' : ''}
            />
            {errors.reason && <span className="error-message">{errors.reason}</span>}
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="save-button">
              Save Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAppointmentForm;