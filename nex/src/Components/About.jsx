import React from "react";

function About(props) {
    return (
      <div id="about">
        <div className="about-image">
            <img src={props.image} alt="" />
            </div>

            <div className="about-text">
                <h2>{props.title}</h2>
                <p>We are passionate about bringing the world closer to you. Our mission is to provide a unique and immersive online experience that allows you to explore the wonders of our world from the comfort of your own home. Whether it's navigating the streets of far-off cities, discovering the history behind ancient artifacts, or enjoying stunning 360-degree views, we are dedicated to making the world more accessible to you. Join us on a journey of exploration and discovery as we strive to share the beauty and diversity of our world with everyone.</p>
               
            </div>
      </div>
    );
}

export default About;