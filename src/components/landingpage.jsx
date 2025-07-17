// src/components/landingpage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { cameraZoomStartedAtom } from '../state/atoms';

export default function LandingPage() {
  const navigate = useNavigate();
  const setCameraZoomStarted = useSetAtom(cameraZoomStartedAtom);

  const handleEnter = () => {
    setCameraZoomStarted(true);
    navigate('/stadium?entered=true');
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
        background: '#240017',
        color: 'white',
        fontFamily: 'Oswald, sans-serif',
      }}
    >
      <button
        onClick={handleEnter}
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
          zIndex: 10,
        }}
      >
        ENTER
      </button>
    </div>
  );
}














