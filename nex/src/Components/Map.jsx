import React, { useEffect, useRef, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper"; // Import Marker component
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
    // PerspectiveCamera,
    // Scene,
    AmbientLight,
    DirectionalLight,
    // WebGLRenderer,
    // Matrix4,
} from "three";
import { ThreeJSOverlayView } from "@googlemaps/three";
import "./Map.css";

const initialCenter = { lat: 41.8902, lng: 12.4922 }; // Set a neutral initial center
// const modelInitialScale = 25;

const mapOptions = {
    mapId: process.env.REACT_APP_GOOGLE_MAPS_ID,
    zoom: 20,
    center: initialCenter, // Set the initial center to be neutral
    heading: 0,
    tilt: 60,
};

function MyMapComponent({ placeInformation }) {
    const [map, setMap] = useState(null); // Initialize map as null
    const ref = useRef();
    const overlayRef = useRef();
    const markerRefs = []; // Refs for the markers
    const openInfoWindowRef = useRef(null);

    useEffect(() => {
        if (!overlayRef.current) {
            console.log("creating overlay");
            const instance = new window.google.maps.Map(
                ref.current,
                mapOptions
            );
            setMap(instance); // Update map when created
            console.log("map created");
            overlayRef.current = createOverlay(instance, placeInformation);
            console.log("overlay created");

            // Create markers for each coordinate
            placeInformation.forEach((place, index) => {
                const coordinate = place.modelCoordinates;
                const marker = new window.google.maps.Marker({
                    position: coordinate,
                    map: instance,
                });

                // Create an InfoWindow for this marker
                const infoWindow = new window.google.maps.InfoWindow({
                    content: `
                            <div class="info-container">
                              <h2>${place.name}</h2>
                              <p>${place.description}</p>
                              <img src="${place.imageUrl}" alt="${place.name}" />              
                              <button onclick="navigate(${coordinate.lat}, ${coordinate.lng})">Let's go</button>
                            </div>
                            `,
                });

                // Add a click event listener to each marker to open the InfoWindow
                marker.addListener("click", () => {
                    if (openInfoWindowRef.current) {
                        openInfoWindowRef.current.close();
                    }

                    // Open the new InfoWindow
                    infoWindow.open(instance, marker);
                    infoWindow.setPosition(coordinate);

                    // Update the openInfoWindowRef with the current InfoWindow
                    openInfoWindowRef.current = infoWindow;
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
            if (openInfoWindowRef.current) {
                openInfoWindowRef.current.close();
            }
        }
    };

    return <div ref={ref} id="map" />;
}

function createOverlay(map, placeInformation) {
    const overlay = new ThreeJSOverlayView({
        anchor: mapOptions.center,
        map,
    });

    const loader = new GLTFLoader();
    placeInformation.forEach((place) => {
        loader.loadAsync(place.model).then((object) => {
            console.log("loaded", object);
            const group = object.scene;
            group.scale.setScalar(place.modelScale);
            group.rotation.set(...Object.values(place.modelRotation));
            const modelCoordinates = overlay.latLngAltitudeToVector3(
                place.modelCoordinates
            );
            group.position.copy(modelCoordinates);
            overlay.scene.add(group);
            const directionalLight = new DirectionalLight(0xffffff, 0.1);
            directionalLight.position.set(
                modelCoordinates.x + 1000,
                modelCoordinates.y + 1000,
                modelCoordinates.z + 1000
            );
            overlay.scene.add(directionalLight);
        });
    });

    overlay.scene.add(new AmbientLight(0xffffff, 0.9));
    // add directional light
    // const directionalLight = new DirectionalLight(0xffffff, 0.9);
    // directionalLight.position.set(100, 100, 100);
    // overlay.scene.add(directionalLight);

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

    //     // loader.manager.onLoad = () => {
    //     //     renderer.setAnimationLoop(() => {
    //     //         map.moveCamera({
    //     //             tilt: mapOptions.tilt,
    //     //             heading: mapOptions.heading,
    //     //             zoom: mapOptions.zoom,
    //     //         });
    //     //         // if (groupObject) {
    //     //         //     const currScale =
    //     //         //         ((mapOptions.zoom - 6) / (20 - 6)) *
    //     //         //             (25 - modelInitialScale) +
    //     //         //         modelInitialScale;
    //     //         //     // ((90000 - 25) / (6 - 20)) * mapOptions.zoom + 150000;
    //     //         //     groupObject.scale.setScalar(currScale);
    //     //         // }
    //     //         if (mapOptions.tilt < 60) {
    //     //             mapOptions.tilt += 0.5;
    //     //         } else if (mapOptions.zoom < 20) {
    //     //             mapOptions.zoom += 0.05;
    //     //         } else if (mapOptions.heading < 125) {
    //     //             mapOptions.heading += 0.5;
    //     //         } else {
    //     //             renderer.setAnimationLoop(null);
    //     //         }
    //     //     });
    //     // };
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
    const [placeInformation, setPlaceInformation] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const res = await fetch(process.env.REACT_APP_SERVER_URL, {
                method: "GET",
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            const databaseInfo = data.placeInformation;

            console.log("fetchedData", databaseInfo);
            setPlaceInformation(databaseInfo);
        }

        fetchData().catch((e) =>
            console.error(
                "There was a problem with your fetch operation: " + e.message
            )
        );
        fetchData();
    }, []);
    if (placeInformation.length === 0) return <div>Loading...</div>;
    return (
        <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <MyMapComponent placeInformation={placeInformation} />
        </Wrapper>
    );
}

export default Map;
