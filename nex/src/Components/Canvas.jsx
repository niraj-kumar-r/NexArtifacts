import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "@react-three/drei";

function Model() {
    const modelPath = "pin.gltf"; // Replace with the path to your 3D model file.

    // Load the 3D model using the GLTFLoader.
    const [model, setModel] = useState(null);
    useEffect(() => {
        const gltfLoader = new GLTFLoader();
        gltfLoader.load(modelPath, (gltf) => {
            setModel(gltf.scene);
        });
    }, [modelPath]);

    return model ? <primitive object={model} /> : null;
}

export function ThreeCanvas() {
    return (
        <Canvas
            camera={{ position: [0, 0, 5] }}
            id="canvas"
            style={{ zIndex: 10 }}
        >
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <OrbitControls />
            <Model />
        </Canvas>
    );
}
