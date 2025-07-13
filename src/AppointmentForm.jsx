// import React, { useState } from 'react';
// import './AddAppointmentForm.css';

// const AddAppointmentForm = ({ selectedDate, onSave, onCancel }) => {
//   const [formData, setFormData] = useState({
//     patientName: '',
//     doctorName: 'Dr. Smith', // default doctor
//     time: '10:00',
//     reason: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const appointment = {
//       ...formData,
//       date: selectedDate.toISOString().split('T')[0],
//       id: Date.now(), // simple unique ID
//       time: `${formData.time} ${formData.time.includes('12:') ? 'PM' : 'AM'}` // simple AM/PM conversion
//     };
//     onSave(appointment);
//   };

//   return (
//     <div className="add-appointment-modal">
//       <div className="modal-content">
//         <h2>Add New Appointment</h2>
//         <p>Date: {selectedDate.toLocaleDateString()}</p>
        
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Patient Name:</label>
//             <input
//               type="text"
//               name="patientName"
//               value={formData.patientName}
//               onChange={handleChange}
//               required
//             />
//           </div>
          
//           <div className="form-group">
//             <label>Doctor:</label>
//             <select
//               name="doctorName"
//               value={formData.doctorName}
//               onChange={handleChange}
//               required
//             >
//               <option value="Dr. Smith">Dr. Smith</option>
//               <option value="Dr. Johnson">Dr. Johnson</option>
//               <option value="Dr. Williams">Dr. Williams</option>
//               <option value="Dr. Brown">Dr. Brown</option>
//             </select>
//           </div>
          
//           <div className="form-group">
//             <label>Time:</label>
//             <input
//               type="time"
//               name="time"
//               value={formData.time}
//               onChange={handleChange}
//               required
//             />
//           </div>
          
//           <div className="form-group">
//             <label>Reason:</label>
//             <textarea
//               name="reason"
//               value={formData.reason}
//               onChange={handleChange}
//               required
//             />
//           </div>
          
//           <div className="form-actions">
//             <button type="button" className="cancel-button" onClick={onCancel}>
//               Cancel
//             </button>
//             <button type="submit" className="save-button">
//               Save Appointment
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddAppointmentForm;