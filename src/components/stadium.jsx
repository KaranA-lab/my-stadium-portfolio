// src/components/stadium.jsx
import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function Stadium() {
  const { scene } = useGLTF('/assets/stadium.glb');

  useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        // Force debug color if stadium materials are too dark
        if (child.material) {
          child.material.color = new THREE.Color(0x777777); // mid-grey
          child.material.emissive = new THREE.Color(0x111111);
          child.material.emissiveIntensity = 0.1;
          child.material.toneMapped = false;
        }
      }
    });
  }, [scene]);

  // Apply generous scale and height lift
  scene.scale.set(0.8, 0.8, 0.8);
  scene.position.set(0, 7, 0); // lift above ground

  return <primitive object={scene} />;
}









