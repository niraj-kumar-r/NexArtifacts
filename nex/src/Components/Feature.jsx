import React, { useRef } from "react";
import FeatureBox from "./FeatureBox";
import featureimage from "../images/showcase.jpg";
import featureimage2 from "../images/streetview.jpg";
import featureimage3 from "../images/showcase.jpg";
import featureimage4 from "../images/rotation.jpg";

function Feature() {
    const featuresRef = useRef(null);
    return (
        <div id="features" ref={featuresRef}>
            <h1
                style={{
                    fontSize: "2.5rem",
                    color: "#000266",
                    textAlign: "center",
                }}
            >
                Features
            </h1>

            <div className="a-container">
                <FeatureBox
                    image={featureimage}
                    title={
                        <span
                            style={{
                                fontSize: "1rem",
                                fontWeight: "bold",
                                color: "#6B90F5",
                            }}
                        >
                            3D Vector World Map
                        </span>
                    }
                    description="Include an interactive world map on the homepage that displays various locations marked with pointers. Users can click on these pointers to explore different locations."
                />
                <FeatureBox
                    image={featureimage2}
                    // title="Street View Integration"
                    title={
                        <span
                            style={{
                                fontSize: "1rem",
                                fontWeight: "bold",
                                color: "#6B90F5",
                            }}
                        >
                            Street View Integration
                        </span>
                    }
                    description="When a user clicks on a location pointer, provide the option to enter a street view mode. This allows users to virtually explore the streets of the selected location."
                />
                <FeatureBox
                    image={featureimage3}
                    // title="Artifact Showcase"
                    title={
                        <span
                            style={{
                                fontSize: "1rem",
                                fontWeight: "bold",
                                color: "#6B90F5",
                            }}
                        >
                            Artifact Showcase
                        </span>
                    }
                    description=" Showcase artifacts from different locations or regions. When users click on an artifact, they can view detailed information about it, such as its history, origin, and significance."
                />
                <FeatureBox
                    image={featureimage4}
                    title={
                        <span
                            style={{
                                fontSize: "1rem",
                                fontWeight: "bold",
                                color: "#6B90F5",
                            }}
                        >
                            360-Degree Rotation
                        </span>
                    }
                    // title="360-Degree Rotation"
                    description="Implement a feature that allows users to rotate the displayed artifacts in 360 degrees for a more immersive experience. Hold shift and drag to rotate the camera."
                />
            </div>
        </div>
    );
}

export default Feature;
