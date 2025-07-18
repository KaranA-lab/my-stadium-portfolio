// src/components/football.jsx
import React, { useEffect, useRef, forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useSphere } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAtomValue } from 'jotai';
import { cameraZoomStartedAtom } from '../state/atoms';

const IMPULSE_FORCE = 0.5;
const MAX_SPEED = 2;

const Football = forwardRef(({ controlsEnabled, boundsRef }, ref) => {
  const { scene } = useGLTF('/assets/football.glb');
  const keys = useRef({});
  const velocityRef = useRef([0, 0, 0]);

  const zoomStarted = useAtomValue(cameraZoomStartedAtom);

  const [physicsRef, api] = useSphere(() => ({
    mass: 1,
    position: [0.12, 13, 0.22],
    args: [0.35],
    linearDamping: 0.95,
    angularDamping: 0.95,
    userData: { id: 'football' } // 👈 Important: ID to detect collisions
  }));

  useEffect(() => {
    if (ref && physicsRef.current) {
      ref.current = { ...physicsRef.current, api };
    }
  }, [ref, physicsRef, api]);

  useEffect(() => {
    const down = (e) => (keys.current[e.key.toLowerCase()] = true);
    const up = (e) => (keys.current[e.key.toLowerCase()] = false);
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = api.velocity.subscribe((v) => (velocityRef.current = v));
    return () => unsubscribe();
  }, [api]);

  useFrame(() => {
    if (!controlsEnabled || !zoomStarted || !ref.current) return;

    const moveX = (keys.current['s'] ? 1 : 0) - (keys.current['w'] ? 1 : 0);
    const moveZ = (keys.current['a'] ? 1 : 0) - (keys.current['d'] ? 1 : 0);

    if (moveX !== 0 || moveZ !== 0) {
      const impulse = new THREE.Vector3(moveX, 0, moveZ)
        .normalize()
        .multiplyScalar(IMPULSE_FORCE);
      api.applyImpulse([impulse.x, 0, impulse.z], [0, 0, 0]);
    }

    const [vx, vy, vz] = velocityRef.current;
    const speed = Math.sqrt(vx * vx + vz * vz);
    if (speed > MAX_SPEED) {
      const scale = MAX_SPEED / speed;
      api.velocity.set(vx * scale, vy, vz * scale);
    }

    if (boundsRef.current?.geometry?.boundingBox) {
      const box = boundsRef.current.geometry.boundingBox;
      const pos = ref.current.position;

      if (
        pos.x < box.min.x || pos.x > box.max.x ||
        pos.z < box.min.z || pos.z > box.max.z
      ) {
        api.velocity.set(0, 0, 0); // Stop the ball if out of pitch bounds
      }
    }
  });

  return <primitive ref={physicsRef} object={scene} scale={0.3} />;
});

export default Football;






















