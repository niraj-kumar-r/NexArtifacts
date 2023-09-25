import { Link } from 'react-router-dom';
import React from 'react';
import './Navbar';
import Navbar from './Navbar';
import Feature from './Feature';


function Header() {
    return (
        <div id='main'>
         <Navbar />         
            <div className='name'>
                <h1><span>Start Exporing the Website</span> With Confidence And Creativity</h1>
                <p className='details'>Quisquam, voluptatum.</p>
                {/* Use Link to navigate to a new route */}
                <Link to="/map" className='cv-btn'>Start Explore</Link>
            </div>    
                    
        </div>

        
    );
}

export default Header;