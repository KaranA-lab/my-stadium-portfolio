// src/components/navbar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { cameraZoomStartedAtom } from '../state/atoms';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const setCameraZoomStarted = useSetAtom(cameraZoomStartedAtom);

  const handleTitleClick = () => {
    setCameraZoomStarted(false);
    if (location.pathname === '/stadium') {
      // Smooth zoom back to landing view inside stadium scene
      navigate('/stadium?entered=false');
    } else {
      // Navigate to basic homepage (static page if needed)
      navigate('/');
    }
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'Oswald, sans-serif',
        fontSize: '1.3rem',
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        userSelect: 'none',
      }}
    >
      <div style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={handleTitleClick}>
        KARAN ANILKUMAR
      </div>
      <div
  onClick={() => navigate('/contact')}
  style={{ fontSize: '1rem', fontStyle: 'italic', cursor: 'pointer' }}
>
  Contact Me
</div>
    </nav>
  );
}

















