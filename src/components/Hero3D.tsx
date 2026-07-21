"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float, OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-red-500/10 border border-red-500 rounded-2xl p-4 text-red-500 text-sm overflow-auto">
          <p className="font-bold mb-2">3D Model Failed to Load</p>
          <pre>{this.state.error?.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const Model = () => {
  // Load the model
  const { scene } = useGLTF("/3D/scene.gltf");
  const groupRef = useRef<THREE.Group>(null);

  // Slowly rotate the model automatically
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <Float
        speed={2} // Animation speed
        rotationIntensity={0.5} // XYZ rotation intensity
        floatIntensity={1.5} // Up/down float intensity
      >
        <primitive object={scene} scale={2} position={[0, -1, 0]} />
      </Float>
    </group>
  );
};

const Hero3D: React.FC = () => {
  return (
    <div className="w-full h-[350px] sm:h-[450px] lg:h-[500px] relative">
      <ErrorBoundary>
        <Canvas
          camera={{ position: [0, 2, 8], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} />
          <Environment preset="city" />

          <Suspense fallback={null}>
            <Model />
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};

// Preload the model
useGLTF.preload("/3D/scene.gltf");

export default Hero3D;
