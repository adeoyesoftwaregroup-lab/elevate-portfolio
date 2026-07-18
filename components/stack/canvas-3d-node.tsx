"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
// 1. Corrected the named export to match the library definition
import { MeshDistortMaterial } from "@react-three/drei";

function RotatingMesh() {
  const meshRef = useRef<any>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4;
      meshRef.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* Structural octahedron mesh frame mimicking 3D vector calculations */}
      <octahedronGeometry args={[1.4, 0]} />
      {/* 2. Swapped the JSX element selector to match the corrected import statement */}
      <MeshDistortMaterial
        color="#6366f1"
        wireframe
        speed={2}
        distort={0.2}
        opacity={0.15}
        transparent
      />
    </mesh>
  );
}

export function Canvas3DNode() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none select-none opacity-40 group-hover:opacity-100 transition-opacity duration-500">
      <Canvas camera={{ position: [0, 0, 3.5] }} gl={{ alpha: true }}>
        <ambientLight intensity={1.5} />
        <RotatingMesh />
      </Canvas>
    </div>
  );
}
