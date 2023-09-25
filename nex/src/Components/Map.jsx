import React, { useState } from 'react';

function Map() {
  const [showJumpButton, setShowJumpButton] = useState(false);

  // Function to show the "Jump" button when the Hyderabad marker is clicked
  const handleMarkerClick = () => {
    setShowJumpButton(true);
  };

  // Function to handle the "Jump" button click
  const handleJumpButtonClick = () => {
    // Add your logic here for what should happen when the "Jump" button is clicked
    alert('Jump to Hyderabad (INDIA)');
  };

  return (
    <div>
      <h1>Map</h1>
      <div className="map-container">
        <div className="message-box" onClick={handleMarkerClick}>
          Please select the below pointing artifacts locations...
        </div>
        {showJumpButton && (
          <button onClick={handleJumpButtonClick}>Jump</button>
        )}
      </div>
      <div id="map" className="hidden">
        <iframe
          title="World Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387619.68259560685!2d-74.25986490692854!3d40.69767000565421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f0839%3A0x2b0f8473c6a02f7a!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sca!4v1599815416663!5m2!1sen!2sca"
          width="100%"
          height="600"
          frameBorder="0"
          style={{ border: '0' }}
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
        ></iframe>
      </div>
    </div>
  );
}

export default Map;
