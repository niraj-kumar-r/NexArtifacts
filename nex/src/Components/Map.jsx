import React, { useEffect, useRef, useState, ReactElement } from "react";
import { createRoot } from "react-dom/client";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Spinner, Text } from "@chakra-ui/react";
import "./Map.css";

const render = (status) => {
    switch (status) {
        case Status.LOADING:
            return <Spinner />;
        case Status.FAILURE:
            return <Text>Failed to load Google Maps</Text>;
        case Status.SUCCESS:
            return <MyMapComponent />;
        default:
            return <Spinner />;
    }
};

const astorPlace = { lat: 40.729884, lng: -73.990988 };
const mapOptions = {
    mapId: process.env.REACT_APP_GOOGLE_MAPS_ID,
    zoom: 18,
    center: astorPlace,
};

function MyMapComponent() {
    const [map, setMap] = useState(null);
    const ref = useRef();

    useEffect(() => {
        setMap(new window.google.maps.Map(ref.current, mapOptions));
    }, []);

    return (
        <>
            <div ref={ref} id="map" />
            {map && <Artifacts map={map} />}
        </>
    );
}

const artifactsData = {
    A: {
        name: "Niraj",
        position: { lat: 40.729681, lng: -73.991138 },
    },
    B: {
        name: "Shafi",
        position: { lat: 40.730031, lng: -73.991428 },
    },
    C: {
        name: "Srinivas",
        position: { lat: 40.729559, lng: -73.990741 },
    },
};

function Artifacts({ map }) {
    const [data, setData] = useState(artifactsData);

    return (
        <>
            {Object.entries(data).map(([key, artifact]) => (
                <ArtifactMarker
                    map={map}
                    key={key}
                    position={artifact.position}
                >
                    <div className="marker">
                        <h2>{artifact.name}</h2>
                    </div>
                </ArtifactMarker>
            ))}
        </>
    );
}

function ArtifactMarker({ children, map, position }) {
    const markerRef = useRef();
    const rootRef = useRef();
    useEffect(() => {
        if (!rootRef.current) {
            const container = document.createElement("div");
            rootRef.current = createRoot(container);
            // Different from what was in the docs
            markerRef.current =
                new window.google.maps.marker.AdvancedMarkerElement({
                    position,
                    content: container,
                });
        }
    }, []);

    useEffect(() => {
        rootRef.current.render(children);
        markerRef.current.position = position;
        markerRef.current.map = map;
    }, [children, map, position]);
}

function Map() {
    return (
        <Wrapper
            apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            version="beta"
            libraries={["marker", "streetView"]}
            render={render}
        />
    );
}

export default Map;
