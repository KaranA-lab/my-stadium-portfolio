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
const CAMERA_TRANSITION_SPEED = 0.02;

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
  scene.rotation.y = Math.PI;

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
      orbitControlsRef.current.target.lerp(new THREE.Vector3(0, 8, 0), CAMERA_TRANSITION_SPEED);
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
  const [showInstructions, setShowInstructions] = useState(false);
  const [showGoalHint, setShowGoalHint] = useState(false);
  const [textInView, setTextInView] = useState(false);
  const netSoundRef = useRef(null);
  const crowdAudioRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setTextInView(true), 300);
  }, []);

  useEffect(() => {
    netSoundRef.current = new Audio('/assets/net.mp3');
    netSoundRef.current.volume = 0.4;
  }, []);

  useEffect(() => {
    crowdAudioRef.current = new Audio('/assets/crowd.mp3');
    crowdAudioRef.current.loop = true;
    crowdAudioRef.current.volume = 0.09;
  }, []);

  useEffect(() => {
    if (!crowdAudioRef.current) return;
    if (zoomStarted) {
      crowdAudioRef.current.currentTime = 0;
      crowdAudioRef.current.play().catch((err) =>
        console.warn("Crowd audio failed to play:", err)
      );
    } else {
      crowdAudioRef.current.pause();
      crowdAudioRef.current.currentTime = 0;
    }
  }, [zoomStarted]);

  useEffect(() => {
    if (zoomStarted) {
      setShowInstructions(true);
      setShowGoalHint(false);
      const timer = setTimeout(() => {
        setShowInstructions(false);
        setShowGoalHint(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [zoomStarted]);

  const handleGoalScore = (i) => {
    setActiveGoal(i);
    setShowGoalHint(false);
    if (netSoundRef.current) {
      netSoundRef.current.currentTime = 0;
      netSoundRef.current.play();
    }
  };

  return (
    <>
      {!zoomStarted && (
        <h1
          style={{
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: zoomStarted
              ? 'translate(-50%, -200%)'
              : textInView
              ? 'translate(-50%, -50%)'
              : 'translate(-50%, -100%)',
            fontSize: '5rem',
            color: 'white',
            fontWeight: '900',
            zIndex: 5,
            fontFamily: 'Oswald, sans-serif',
            textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
            transition: 'transform 1.3s ease, opacity 1.3s ease',
            opacity: zoomStarted ? 0 : textInView ? 1 : 0,
            pointerEvents: 'none',
          }}
        >
          WELCOME TO MY PORTFOLIO
        </h1>
      )}

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

      {showInstructions && (
        <div style={{
          position: 'absolute',
          top: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '1rem',
          zIndex: 20,
          fontSize: '0.9rem',
          textAlign: 'center',
          lineHeight: '1.5',
        }}>
          🎮 Use <strong>WASD</strong> to move the ball <br />
          🖱️ Use <strong>Mouse</strong> to rotate the camera
        </div>
      )}

      {showGoalHint && (
        <div style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          backgroundColor: 'rgba(0,0,0,0.85)',
          color: 'white',
          padding: '0.7rem 1rem',
          borderRadius: '1rem',
          zIndex: 20,
          fontSize: '0.95rem',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          border: '1.5px solid white',
          boxShadow: '0 0 6px rgba(255,255,255,0.1)',
          maxWidth: '300px'
        }}>
          <span style={{
            fontSize: '1.3rem',
            animation: 'bounce 1.3s infinite'
          }}>⚽</span>
          <span>Score a goal to reveal a project!</span>
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













































