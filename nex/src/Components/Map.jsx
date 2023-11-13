import React, { useEffect, useRef, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper"; // Import Marker component
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
    // PerspectiveCamera,
    // Scene,
    AmbientLight,
    DirectionalLight,
    // WebGLRenderer,dd
    // Matrix4,
} from "three";
import { ThreeJSOverlayView } from "@googlemaps/three";
import "./Map.css";

const initialCenter = { lat: 27.17445, lng: 78.0421 }; // Set a neutral initial center
// const modelInitialScale = 25;

const mapOptions = {
    mapId: process.env.REACT_APP_GOOGLE_MAPS_ID,
    zoom: 20,
    center: initialCenter, // Set the initial center to be neutral
    heading: 0,
    tilt: 60,
    labels: false,
};

const placeInformation = [
    {
        model: "/taj_mahal_3d_model/scene.gltf",
        modelScale: 0.19,
        modelRotation: { x: Math.PI / 2, y: -0.01, z: 0 },
        modelCoordinates: { lat: 27.175, lng: 78.042128 },
        name: "Taj Mahal",
        description:
            "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the Yamuna river in the Indian city of Agra.",
        imageUrl: "/images/tajMahal.jpg", // Replace with the URL of an image for the place
    },
    {
        model: "/low_poly/scene.gltf",
        modelScale: 25,
        modelRotation: { x: Math.PI / 2, y: 0, z: 0 },
        modelCoordinates: { lat: 17.3616, lng: 78.4747 },
        name: "Charminar",
        description:
            "The Charminar is a monument and mosque located in Hyderabad, Telangana, India. The landmark has become a global icon of Hyderabad, listed among the most recognized structures of India.",
        imageUrl: "URL_TO_OTHER_IMAGE", // Replace with the URL of an image for the place
    },
    {
        model: "krishna_muec/scene.gltf",
        modelScale: 150,
        modelRotation: { x: Math.PI / 2, y: 0, z: 0 },
        modelCoordinates: { lat: 48.8584, lng: 2.2945, altitude: 40 },
        name: "Eiffel Tower",
        description:
            "The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower",
        imageUrl: "URL_TO_ANOTHER_IMAGE", // Replace with the URL of an image for the place
    },
];

function MyMapComponent() {
    const [map, setMap] = useState(null); // Initialize map as null
    const ref = useRef();
    const overlayRef = useRef();
    const markerRefs = []; // Refs for the markers

    useEffect(() => {
        if (!overlayRef.current) {
            console.log("creating overlay");
            const instance = new window.google.maps.Map(
                ref.current,
                mapOptions
            );
            setMap(instance); // Update map when created
            console.log("map created");
            overlayRef.current = createOverlay(instance);
            console.log("overlay created");

            // Create markers for each coordinate
            placeInformation.forEach((place, index) => {
                const coordinate = place.modelCoordinates;
                const marker = new window.google.maps.Marker({
                    position: coordinate,
                    map: instance,
                    // icon: place.imageUrl,
                });

                // Create an InfoWindow for this marker
                const infoWindow = new window.google.maps.InfoWindow({
                    content: `
                              <h2>${place.name}</h2>
                              <p>${place.description}</p>
                              <img src="${place.imageUrl}" alt="${place.name}" />              
                              <button onclick="navigate(${coordinate.lat}, ${coordinate.lng})">Let's go</button>
                            `,
                });

                // Add a click event listener to each marker to open the InfoWindow
                marker.addListener("click", () => {
                    infoWindow.open(instance, marker); // Open the InfoWindow

                    // Ensure the InfoWindow is correctly positioned
                    infoWindow.setPosition(coordinate);
                });

                markerRefs[index] = marker; // Store the marker reference
            });
        }
    }, []);

    // Define the navigate function in the global scope
    window.navigate = (lat, lng) => {
        if (map) {
            const newCenter = new window.google.maps.LatLng(lat, lng);
            map.panTo(newCenter);
            map.setZoom(600); // Adjust the zoom level as needed (15 is an example)
        }
    };

    return <div ref={ref} id="map" />;
}

function createOverlay(map) {
    // eslint-disable-next-line no-undef
    // const overlay = new google.maps.WebGLOverlayView();
    const overlay = new ThreeJSOverlayView({
        // upAxis: "Y",
        anchor: mapOptions.center,
        map,
    });

    // let renderer, scene, camera;
    // let groupObject;
    const loader = new GLTFLoader();
    placeInformation.forEach((place) => {
        loader.loadAsync(place.model).then((object) => {
            console.log("loaded", object);
            const group = object.scene;
            group.scale.setScalar(place.modelScale);
            group.rotation.set(...Object.values(place.modelRotation));
            group.position.copy(
                overlay.latLngAltitudeToVector3(place.modelCoordinates)
            );
            overlay.scene.add(group);
        });
    });

    overlay.scene.add(new AmbientLight(0xffffff, 0.9));
    // add directional light
    const directionalLight = new DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(100, 100, 100);
    overlay.scene.add(directionalLight);

    // overlay.onAdd = () => {
    //     scene = new Scene();
    //     camera = new PerspectiveCamera();
    //     const light = new AmbientLight(0xffffff, 0.9);
    //     // add directional light
    //     const directionalLight = new DirectionalLight(0xffffff, 0.9);
    //     directionalLight.position.set(10, 10, 10);
    //     scene.add(directionalLight);
    //     scene.add(light);
    //     console.log("in onAdd");

    //     loader = new GLTFLoader();
    //     loader.loadAsync("/low_poly/scene.gltf").then((object) => {
    //         console.log("loaded", object);
    //         const group = object.scene;
    //         groupObject = group;
    //         group.scale.setScalar(modelInitialScale);
    //         group.rotation.set(Math.PI / 2, 0, 0);
    //         group.position.setY(-120);
    //         scene.add(group);
    //     });

    //     // loader.loadAsync("/taj_mahal_3d_model/scene.gltf").then((object) => {
    //     //     console.log("loaded", object);
    //     //     const group = object.scene;
    //     //     groupObject = group;
    //     //     group.scale.setScalar(0.19);
    //     //     group.rotation.set(Math.PI / 2, 0, 0);
    //     //     group.position.setZ(-120);
    //     //     scene.add(group);
    //     // });
    // };

    // overlay.onContextRestored = ({ gl }) => {
    //     renderer = new WebGLRenderer({
    //         canvas: gl.canvas,
    //         context: gl,
    //         ...gl.getContextAttributes(),
    //     });
    //     renderer.autoClear = false;

    //     loader.manager.onLoad = () => {
    //         renderer.setAnimationLoop(() => {
    //             map.moveCamera({
    //                 tilt: mapOptions.tilt,
    //                 heading: mapOptions.heading,
    //                 zoom: mapOptions.zoom,
    //             });
    //             // if (groupObject) {
    //             //     const currScale =
    //             //         ((mapOptions.zoom - 6) / (20 - 6)) *
    //             //             (25 - modelInitialScale) +
    //             //         modelInitialScale;
    //             //     // ((90000 - 25) / (6 - 20)) * mapOptions.zoom + 150000;
    //             //     groupObject.scale.setScalar(currScale);
    //             // }
    //             if (mapOptions.tilt < 60) {
    //                 mapOptions.tilt += 0.5;
    //             } else if (mapOptions.zoom < 20) {
    //                 mapOptions.zoom += 0.05;
    //             } else if (mapOptions.heading < 125) {
    //                 mapOptions.heading += 0.5;
    //             } else {
    //                 renderer.setAnimationLoop(null);
    //             }
    //         });
    //     };
    // };

    // overlay.onDraw = ({ transformer }) => {
    //     const matrix = transformer.fromLatLngAltitude({
    //         lat: mapOptions.center.lat,
    //         lng: mapOptions.center.lng,
    //         altitude: 120,
    //     });
    //     camera.projectionMatrix = new Matrix4().fromArray(matrix);
    //     console.log("in onDraw");

    //     overlay.requestRedraw();
    //     renderer.render(scene, camera);
    //     renderer.resetState();
    // };

    // eslint-disable-next-line no-undef
    // const infoWindow = new google.maps.InfoWindow();

    // overlay.setMap(map);

    return overlay;
}

function Map() {
    return (
        <Wrapper
            apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            // version="beta"
            // libraries={["marker", "streetView"]}
            // render={render}
        >
            <MyMapComponent />
        </Wrapper>
    );
}

export default Map;
