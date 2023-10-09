import React, { useEffect, useRef, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
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

const center = { lat: 27.17445, lng: 78.0421 };
const mapOptions = {
    mapId: process.env.REACT_APP_GOOGLE_MAPS_ID,
    zoom: 1,
    center: center,
    // disableDefaultUI: true,
    heading: 0,
    tilt: 60,
};

function MyMapComponent() {
    const [map, setMap] = useState();
    const ref = useRef();
    const overlayRef = useRef();

    useEffect(() => {
        if (!overlayRef.current) {
            console.log("creating overlay");
            const instance = new window.google.maps.Map(
                ref.current,
                mapOptions
            );
            setMap(instance);
            console.log("map created");
            overlayRef.current = createOverlay(instance);
        }
    }, []);

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
            group.scale.setScalar(5000);
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
                        ((mapOptions.zoom - 6) / (20 - 6)) * (25 - 5000) + 5000;
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
