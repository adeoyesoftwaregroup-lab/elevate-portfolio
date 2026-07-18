"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

function ParticleField() {
  const ref = useRef<any>(null);

  // Generate 3000 points distributed inside the 3D grid matrix
  const sphere = random.inSphere(new Float32Array(3000), {
    radius: 1.5,
  }) as Float32Array;

  useFrame((_, delta) => {
    if (ref.current) {
      // Smooth kinetic rotation tracking
      ref.current.rotation.x -= delta / 12;
      ref.current.rotation.y -= delta / 18;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          // Crisp crystal white particles pop cleanly over your shiny black background
          color="#ffffff"
          size={0.0035}
          sizeAttenuation={true}
          depthWrite={false}
          // Subtle opacity prevents the star-field from looking too harsh
          opacity={0.25}
        />
      </Points>
    </group>
  );
}

export function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-20 h-full w-full bg-transparent select-none pointer-events-none">
      <div className="absolute inset-0 w-full h-full opacity-100">
        {/* 
          CORRECT INTEGRATION:
          Alpha constraints are mapped cleanly inside the `gl` context property object 
          to remove the TypeScript parameter error while ensuring true transparency.
        */}
        <Canvas
          camera={{ position: [0, 0, 1] }}
          gl={{ alpha: true, antialias: true }}
        >
          <ParticleField />
        </Canvas>
      </div>
    </div>
  );
}
