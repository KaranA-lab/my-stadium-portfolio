// src/components/stadiumexperience.jsx
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { Physics, usePlane } from '@react-three/cannon';
import * as THREE from 'three';
import { useSetAtom, useAtomValue } from 'jotai';
import { cameraZoomStartedAtom } from '../state/atoms';

import Football from './football';
import Goal from './goal';
import { StadiumLights } from './stadiumlights';
import GoalOverlay from './goaloverlay';

const CAMERA_OFFSET = new THREE.Vector3(0.4, 0.3, 0);
const TOP_VIEW_POSITION = new THREE.Vector3(0, 25, 25);
const CAMERA_TRANSITION_SPEED = 0.05;

const StadiumWrapper = React.forwardRef((props, ref) => {
  const { scene } = useGLTF('/assets/stadium.glb');

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        if (obj.name === 'Pitch' && obj.geometry && ref) {
          obj.geometry.computeBoundingBox();
          ref.current = obj;
        }
      }
    });
  }, [scene, ref]);

  scene.scale.set(0.5, 0.5, 0.5);
  scene.position.set(0, 7, 0);

  return <primitive object={scene} />;
});

function GroundPlane() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 6.83, 0],
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="green" transparent opacity={0} />
    </mesh>
  );
}

function CameraController({ target, orbitControlsRef }) {
  const { camera } = useThree();
  const ballPosition = useRef(new THREE.Vector3());
  const zoomStarted = useAtomValue(cameraZoomStartedAtom);

  useEffect(() => {
    let unsubscribe;
    if (target.current?.api?.position) {
      unsubscribe = target.current.api.position.subscribe(([x, y, z]) => {
        ballPosition.current.set(x, y, z);
      });
    }
    return () => unsubscribe?.();
  }, [target]);

  useFrame(() => {
    const targetPos = ballPosition.current.clone();
    const followTarget = targetPos.clone().add(CAMERA_OFFSET);

    if (zoomStarted) {
      camera.position.lerp(followTarget, CAMERA_TRANSITION_SPEED);
      orbitControlsRef.current.target.lerp(targetPos, CAMERA_TRANSITION_SPEED);
      orbitControlsRef.current.update();
    } else {
      camera.position.lerp(TOP_VIEW_POSITION, CAMERA_TRANSITION_SPEED);
      orbitControlsRef.current.target.lerp(new THREE.Vector3(0, 5, 0), CAMERA_TRANSITION_SPEED);
      orbitControlsRef.current.update();
    }
  });

  return null;
}

export default function StadiumExperience() {
  const boundsRef = useRef();
  const ballRef = useRef();
  const goalRefs = useRef([...Array(6)].map(() => React.createRef()));
  const orbitControlsRef = useRef();
  const setZoomStarted = useSetAtom(cameraZoomStartedAtom);
  const zoomStarted = useAtomValue(cameraZoomStartedAtom);
  const [activeGoal, setActiveGoal] = useState(null);
  const netSoundRef = useRef(null);

  useEffect(() => {
    netSoundRef.current = new Audio('/assets/net.mp3');
  }, []);

  const handleGoalScore = (i) => {
    setActiveGoal(i);
    if (netSoundRef.current) {
      netSoundRef.current.currentTime = 0;
      netSoundRef.current.play();
    }
  };

  return (
    <>
      {!zoomStarted && (
        <div style={{
          height: '100vh',
          width: '100vw',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 10,
          background: 'transparent',
        }}>
          <button
            onClick={() => setZoomStarted(true)}
            style={{
              position: 'absolute',
              bottom: '15%',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '1rem 2.5rem',
              fontSize: '1rem',
              border: '2px solid white',
              background: 'transparent',
              color: 'white',
              borderRadius: '2rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            ENTER
          </button>
        </div>
      )}

      {activeGoal !== null && (
        <GoalOverlay
          goalIndex={activeGoal}
          onClose={() => setActiveGoal(null)}
        />
      )}

      <Canvas
        shadows
        camera={{ position: TOP_VIEW_POSITION.toArray(), fov: 45 }}
        style={{ width: '100vw', height: '100vh', background: '#101010' }}
        gl={{
          physicallyCorrectLights: true,
          toneMappingExposure: 0.18,
        }}
      >
        <fog attach="fog" args={['#12000c', 30, 90]} />

        <React.Suspense fallback={null}>
          <ambientLight intensity={0.01} />
          <directionalLight
            position={[10, 20, 10]}
            intensity={0.6}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <Environment preset="city" />

          <Physics gravity={[0, -9.8, 0]}>
            <StadiumWrapper ref={boundsRef} />
            <StadiumLights boundsRef={boundsRef} />
            <GroundPlane />
            <Football ref={ballRef} controlsEnabled={zoomStarted} boundsRef={boundsRef} />
            {[...Array(6)].map((_, i) => (
              <Goal
                key={i}
                ref={goalRefs.current[i]}
                position={[[-5.8, 7.45, 0.23], [-3.1, 7.45, -3.3], [5.95, 7.45, 0.23], [3.1, 7.45, -3.3], [3, 7.45, 3.76], [-3.1, 7.45, 3.76]][i]}
                rotation={[[0, 1.58, 0], [0, 0, 0], [0, -Math.PI / 2, 0], [0, 0, 0], [0, -3.1, 0], [0, -3.1, 0]][i]}
                netDistanceBehind={0.5}
                onGoalScored={() => handleGoalScore(i)}
              />
            ))}
          </Physics>

          <CameraController
            target={ballRef}
            orbitControlsRef={orbitControlsRef}
          />

          <OrbitControls
            ref={orbitControlsRef}
            enabled={zoomStarted}
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3.5}
            maxPolarAngle={Math.PI / 2.1}
            minDistance={10}
            maxDistance={25}
          />
        </React.Suspense>
      </Canvas>
    </>
  );
}










































