// src/components/Goal.jsx
import React, { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useBox } from '@react-three/cannon';

const DEFAULT_POSITION = [0, 7, 0];
const DEFAULT_ROTATION = [0, 1.54, 0];
const DEFAULT_SCALE = 0.52;
const DEFAULT_NET_DISTANCE = 0.5;

const Goal = forwardRef(
  (
    {
      position = DEFAULT_POSITION,
      rotation = DEFAULT_ROTATION,
      scale = DEFAULT_SCALE,
      debug = false,
      netDistanceBehind = DEFAULT_NET_DISTANCE,
      onClick,
      onGoalScored, // 👈 new prop
      ...props
    },
    ref
  ) => {
    const { scene } = useGLTF('/assets/goal.glb');
    const visual = scene.clone();

    // Calculate net wall position
    const rotationY = rotation[1] || 0;
    const netPos = [
      position[0] - Math.sin(rotationY) * netDistanceBehind,
      position[1],
      position[2] - Math.cos(rotationY) * netDistanceBehind,
    ];

    // Physics collider behind the goal to detect collisions
    const [netRef] = useBox(() => ({
      type: 'Static',
      args: [1.3, 1.5, 0.1],
      position: netPos,
      rotation,
      onCollide: (e) => {
        if (e.body?.userData?.id === 'football' && typeof onGoalScored === 'function') {
          onGoalScored();
        }
      }
    }));

    return (
      <>
        {/* Visual Goal Mesh */}
        <primitive
          ref={ref}
          object={visual}
          position={position}
          rotation={rotation}
          scale={scale}
          castShadow
          receiveShadow
          onClick={onClick}
          {...props}
        />

        {/* Invisible net collider wall */}
        {debug && (
          <mesh position={netPos} rotation={rotation}>
            <boxGeometry args={[1.3, 1.5, 0.1]} />
            <meshStandardMaterial color="blue" transparent opacity={0.5} />
          </mesh>
        )}
      </>
    );
  }
);

export default Goal;










