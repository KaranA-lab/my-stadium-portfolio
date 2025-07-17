// src/components/StadiumLights.jsx
import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function StadiumLights({ boundsRef }) {
  const lights = useRef([]);
  const targets = useRef([]);
  const { scene } = useThree();

  // Create and add light targets to the scene once
  useEffect(() => {
    targets.current = Array.from({ length: 4 }, () => {
      const target = new THREE.Object3D();
      scene.add(target);
      return target;
    });

    return () => {
      targets.current.forEach(target => scene.remove(target));
    };
  }, [scene]);

  useFrame(() => {
    const bounds = boundsRef.current?.geometry?.boundingBox;
    if (!bounds) return;

    const corners = [
      [bounds.min.x, 30, bounds.min.z],
      [bounds.max.x, 30, bounds.min.z],
      [bounds.min.x, 30, bounds.max.z],
      [bounds.max.x, 30, bounds.max.z],
    ];

    const centerX = (bounds.min.x + bounds.max.x) / 2;
    const centerZ = (bounds.min.z + bounds.max.z) / 2;

    corners.forEach((corner, idx) => {
      const light = lights.current[idx];
      const target = targets.current[idx];
      if (light && target) {
        light.position.set(...corner);
        target.position.set(centerX, 7, centerZ); // pitch center
        light.target = target;
        light.target.updateMatrixWorld();
      }
    });
  });

  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <spotLight
          key={i}
          ref={(el) => (lights.current[i] = el)}
          angle={0.4}
          intensity={12}
          penumbra={1}
          decay={2}
          distance={150}
          color="white"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
      ))}
    </>
  );
}







