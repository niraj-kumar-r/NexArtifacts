// Mode.jsx

import React, { useState, useEffect } from "react";

function ModeChange({ onModeChange }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
    onModeChange(isDarkMode);
  }, [isDarkMode, onModeChange]);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="mode-change">
      <label className="switch">
        <input type="checkbox" onChange={toggleMode} checked={isDarkMode} />
        <span className="slider round"></span>
      </label>
      <p>{isDarkMode ? "Dark Mode" : "Light Mode"}</p>
    </div>
  );
}

export default ModeChange;
