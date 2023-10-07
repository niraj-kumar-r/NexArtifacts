import React, { useRef } from "react";
import FeatureBox from "./FeatureBox";
import featureimage from "../images/feature_1.png";
import featureimage2 from "../images/feature_2.png";
import featureimage3 from "../images/feature_3.png";

function Feature() {
    const featuresRef = useRef(null);
    return (
        <div id="features" ref={featuresRef}>
            <h1>Features</h1>
            <div className="a-container">
                <FeatureBox
                    image={featureimage}
                    title="Interactive World Map"
                    description="Include an interactive world map on the homepage that displays various locations marked with pointers. Users can click on these pointers to explore different locations."
                />
                <FeatureBox
                    image={featureimage2}
                    title="Street View Integration"
                    description="When a user clicks on a location pointer, provide the option to enter a street view mode. This allows users to virtually explore the streets of the selected location."
                />
                <FeatureBox
                    image={featureimage3}
                    title="Artifact Showcase"
                    description=" Showcase artifacts from different locations or regions. When users click on an artifact, they can view detailed information about it, such as its history, origin, and significance."
                />
                  <FeatureBox
                    image={featureimage3}
                    title="360-Degree Rotation"
                    description="Implement a feature that allows users to rotate the displayed artifacts in 360 degrees for a more immersive experience."
                />
            </div>
        </div>
    );
}

export default Feature;
