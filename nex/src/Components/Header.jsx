import { Link } from 'react-router-dom';
import React from 'react';
import './Navbar';
import Navbar from './Navbar';


function Header() {
    return (
        <div id='main'>
         <Navbar />         
            <div className='name'>
                <h1><span>Ready to Explore 3D Artifacts in Street View?</span> Let's Begin Our Journey</h1>
                <Link to="/map" className='cv-btn'>Start Explore</Link>
            </div>    
                    
        </div>

        
    );
}

export default Header;