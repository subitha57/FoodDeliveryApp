// DineIn.js
import React, { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';

const DineIn = ({ onClose, onContinue }) => {
  const [reservationTime, setReservationTime] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const handleReservationTimeChange = (e) => {
    setReservationTime(e.target.value);
  };

  const handleNumberOfPeopleChange = (e) => {
    setNumberOfPeople(parseInt(e.target.value));
  };

  const handleContinue = () => {
    // Implement continue functionality if needed
    onClose();
    onContinue(); // Close the DineIn component
  };

  return (
    <div className="dinein-container">
      <h2>Dine In</h2>
      
      <div className="form-group">
        <label htmlFor="reservationTime">Reservation Time:</label>
        <input type="time" id="reservationTime" value={reservationTime} onChange={handleReservationTimeChange} />
      </div>
      <div className="form-group">
        <label htmlFor="numberOfPeople">Number of People:</label>
        <input type="number" id="numberOfPeople" min="1" value={numberOfPeople} onChange={handleNumberOfPeopleChange} />
      </div>
      <button onClick={handleContinue}>Continue</button> {/* Continue button */}
    </div>
  );
};

export default DineIn;
