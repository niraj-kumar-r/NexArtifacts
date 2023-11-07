import React, { useEffect, useRef, useState } from "react";
import { Wrapper, Marker } from "@googlemaps/react-wrapper"; // Import Marker component
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
  PerspectiveCamera,
  Scene,
  AmbientLight,
  DirectionalLight,
  WebGLRenderer,
  Matrix4,
} from "three";
import "./Map.css";

const initialCenter = { lat: 48.8584, lng: 2.2945 }; // Set a neutral initial center
const modelInitialScale = 10000;

const mapOptions = {
  mapId: process.env.REACT_APP_GOOGLE_MAPS_ID,
  zoom: 1,
  center: initialCenter, // Set the initial center to be neutral
  heading: 0,
  tilt: 60,
};


const markerCoordinates = [
    { lat: 27.17445, lng: 78.0421 }, // Coordinate 1
    { lat:17.3616 , lng:  78.4747  }, // Coordinate 2
    {lat: 48.8584, lng: 2.2945 }, // Coordinate 3
    // Add more coordinates as needed
  ];
  
  function MyMapComponent() {
    const [map, setMap] = useState(null); // Initialize map as null
    const ref = useRef();
    const overlayRef = useRef();
    const markerRefs = []; // Refs for the markers
  
    useEffect(() => {
      if (!overlayRef.current) {
        console.log("creating overlay");
        const instance = new window.google.maps.Map(ref.current, mapOptions);
        setMap(instance); // Update map when created
        console.log("map created");
        overlayRef.current = createOverlay(instance);
  
        // Create markers for each coordinate
        markerCoordinates.forEach((coordinate, index) => {
          const marker = new window.google.maps.Marker({
            position: coordinate,
            map: instance,
          });
  
          // Create an InfoWindow for this marker
          const infoWindow = new window.google.maps.InfoWindow({
            content: `<button onclick="navigate(${coordinate.lat}, ${coordinate.lng})">Let's go</button>`, // Content to display when the marker is clicked
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
    const overlay = new google.maps.WebGLOverlayView();
    let renderer, scene, camera, loader;
    let groupObject;

    overlay.onAdd = () => {
        scene = new Scene();
        camera = new PerspectiveCamera();
        const light = new AmbientLight(0xffffff, 0.9);
        // add directional light
        const directionalLight = new DirectionalLight(0xffffff, 0.9);
        directionalLight.position.set(10, 10, 10);
        scene.add(directionalLight);
        scene.add(light);

        loader = new GLTFLoader();
        loader.loadAsync("/low_poly/scene.gltf").then((object) => {
            console.log("loaded", object);
            const group = object.scene;
            groupObject = group;
            group.scale.setScalar(modelInitialScale);
            group.rotation.set(Math.PI / 2, 0, 0);
            group.position.setZ(-120);
            scene.add(group);
        });
    };

    overlay.onContextRestored = ({ gl }) => {
        renderer = new WebGLRenderer({
            canvas: gl.canvas,
            context: gl,
            ...gl.getContextAttributes(),
        });
        renderer.autoClear = false;

        loader.manager.onLoad = () => {
            renderer.setAnimationLoop(() => {
                map.moveCamera({
                    tilt: mapOptions.tilt,
                    heading: mapOptions.heading,
                    zoom: mapOptions.zoom,
                });
                if (groupObject) {
                    const currScale =
                        ((mapOptions.zoom - 6) / (20 - 6)) *
                            (25 - modelInitialScale) +
                        modelInitialScale;
                    // ((90000 - 25) / (6 - 20)) * mapOptions.zoom + 150000;
                    groupObject.scale.setScalar(currScale);
                }
                if (mapOptions.tilt < 60) {
                    mapOptions.tilt += 0.5;
                } else if (mapOptions.zoom < 20) {
                    mapOptions.zoom += 0.05;
                } else if (mapOptions.heading < 125) {
                    mapOptions.heading += 0.5;
                } else {
                    renderer.setAnimationLoop(null);
                }
            });
        };
    };

    overlay.onDraw = ({ transformer }) => {
        const matrix = transformer.fromLatLngAltitude({
            lat: mapOptions.center.lat,
            lng: mapOptions.center.lng,
            altitude: 120,
        });
        camera.projectionMatrix = new Matrix4().fromArray(matrix);

        overlay.requestRedraw();
        renderer.render(scene, camera);
        renderer.resetState();
    };

    // eslint-disable-next-line no-undef
    // const infoWindow = new google.maps.InfoWindow();

    overlay.setMap(map);

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
