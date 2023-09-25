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
                <FeatureBox image={featureimage} title="Development Course" />
                <FeatureBox image={featureimage2} title="Money Saving" />
                <FeatureBox image={featureimage3} title="Easy To Use" />
            </div>
        </div>
    );
}

export default Feature;
