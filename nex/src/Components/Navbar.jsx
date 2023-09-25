import React, {useState} from 'react';
import logo from "../images/logo.png";

function Navbar() {

    const [nav, setNav] = useState(false);

    const changeBackground = () => {
        if(window.scrollY >= 50) {
            setNav(true);
        } else {
            setNav(false);
        }
    }   //the changeBackground function is used to change the background color of the navbar when the user scrolls down the page that is when the scrollY is greater than or equal to 50px then the background color of the navbar changes to white

    window.addEventListener('scroll', changeBackground); //this is a listener that listens to the scroll event and calls the changeBackground function
    
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
    
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      };


    return (
        <nav className={nav ? 'nav active' : 'nav'}>
            < a href="#" className="logo">
                <img src={logo} alt='' />
            </a>

            <input type="checkbox"  className="menu-btn" id="menu-btn"/>
            <label className="menu-icon" for="menu-btn">
                <span className="nav-icon"></span>
            </label>

            <ul className="menu">
            <li><a href="#HOME" onClick={scrollToTop}>Home</a></li>
                <li> <a href="#FEATURE" onClick={() => scrollToSection("features")}>Features</a></li>   
                <li><a href="#ABOUT" onClick={() => scrollToSection("about")}>About</a></li>
                <li><a href="#CONTACT" onClick={() => scrollToSection("contact")}>Contact</a></li>

            </ul>
        </nav>
    );

}


export default Navbar;