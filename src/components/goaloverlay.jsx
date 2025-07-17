// src/components/goaloverlay.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const projectData = [
  { id: 1, title: 'Alexander Babu: Ticket Booking Website' },
  { id: 2, title: 'RMKV : Wedding Collection' },
  { id: 3, title: 'Deepsense Company Website' },
  { id: 4, title: 'Classmate Notebook: E-commerce Website' },
  { id: 5, title: 'Naturals Bridal landing page' },
  { id: 6, title: 'MTR Spices Landing Page' },
];

export default function GoalOverlay({ goalIndex, onClose }) {
  const navigate = useNavigate();
  const project = projectData[goalIndex];

  const handleClick = () => {
    navigate(`/project-${project.id}`);
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(0,0,0,0.85)',
        padding: '1.5rem 2rem',
        borderRadius: '1rem',
        color: 'white',
        zIndex: 1000,
        textAlign: 'center',
        fontFamily: 'Oswald, sans-serif',
      }}
    >
      <h2 style={{ marginBottom: '1rem' }}>{project.title}</h2>
      <button
        onClick={handleClick}
        style={{
          background: 'white',
          color: 'black',
          border: 'none',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        View Project
      </button>
      <button
        onClick={onClose}
        style={{
          marginTop: '1rem',
          background: 'transparent',
          color: 'white',
          border: '1px solid white',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        Close
      </button>
    </div>
  );
}



