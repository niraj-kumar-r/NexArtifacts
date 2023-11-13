// Navbar.jsx

import React, { useState } from "react";
import logo from "../images/logo2.png";
import ModeChange from "./Mode"; // Adjust the import path based on your project structure

function Navbar() {
  const [nav, setNav] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setNav(true);
    } else {
      setNav(false);
    }
  };

  const handleModeChange = (mode) => {
    setIsDarkMode(mode);
  };

  window.addEventListener("scroll", changeBackground);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={nav ? "nav active" : "nav"}>
      <a href="#" className="logo">
        <img src={logo} alt="" />
      </a>

      <input type="checkbox" className="menu-btn" id="menu-btn" />
      <label className="menu-icon" htmlFor="menu-btn">
        <span className="nav-icon"></span>
      </label>

      <ul className="menu">
        <li>
          <a href="#HOME" onClick={scrollToTop}>
            Home
          </a>
        </li>
        <li>
          <a href="#FEATURE" onClick={() => scrollToSection("features")}>
            Features
          </a>
        </li>

        <li>
          <a href="#ABOUT" onClick={() => scrollToSection("about")}>
            About
          </a>
        </li>

        <li>
          <a href="#CONTACT" onClick={() => scrollToSection("contact")}>
            Contact
          </a>
        </li>
      </ul>

      {/* Include the ModeChange component */}
      <ModeChange onModeChange={handleModeChange} />
    </nav>
  );
}

export default Navbar;
