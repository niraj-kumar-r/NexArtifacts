import { Link } from "react-router-dom";
import React from "react";
import "./Navbar";
import Navbar from "./Navbar";
import svgIMG from "../images/3d-casual-life-young-man-holding-paper-map.png";

function Header() {
    return (
        <div id="main">
            <Navbar />
            <div className="name">
                <h1>
                    <span>Ready to Explore 3D Artifacts in Street View?</span>{" "}
                    Let's Begin Our Journey
                </h1>
                <Link to="/map" className="cv-btn">
                    Start Explore
                </Link>
            </div>
            <img id="my-pic" src={svgIMG} alt="style" />
        </div>
    );
}

export default Header;
