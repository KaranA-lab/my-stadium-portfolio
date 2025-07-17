// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/landingpage';
import StadiumExperience from './components/stadiumexperience';
import ProjectPlaceholder from './components/projectplaceholder';
import Navbar from './components/navbar';
import WebGLTest from './components/WebGLtest'; // ✅ Added test component
import ContactPage from './components/contactpage';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<StadiumExperience />} />
        <Route path="/contact" element={<ContactPage />} /> // ✅ Correct
        <Route path="/webgl" element={<WebGLTest />} /> {/* ✅ Test route */}
        {[1, 2, 3, 4, 5, 6].map((id) => (
          <Route key={id} path={`/project-${id}`} element={<ProjectPlaceholder projectId={id} />} />
        ))}
      </Routes>
    </>
  );
}









