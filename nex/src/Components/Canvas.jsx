import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "@react-three/drei";

export function Model() {
    const modelPath = "pin.gltf"; // Replace with the path to your 3D model file.

    // Load the 3D model using the GLTFLoader.
    const [model, setModel] = useState(null);
    useEffect(() => {
        const gltfLoader = new GLTFLoader();
        gltfLoader.load(modelPath, (gltf) => {
            setModel(gltf.scene);
        });
    }, [modelPath]);
    // resize the model
    useEffect(() => {
        if (model) {
            model.scale.set(0.5, 0.5, 0.5);
            model.rotation.x = Math.PI / 2;
        }
    }, [model]);

    return model ? <primitive object={model} /> : null;
}

export function ThreeCanvas() {
    return (
        <Canvas
            camera={{ position: [0, 0, 5] }}
            id="canvas"
            style={{ zIndex: 10, height: "100%", width: "100%" }}
        >
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <OrbitControls />
            <Model />
        </Canvas>
    );
}
