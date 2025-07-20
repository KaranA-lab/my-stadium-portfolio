import React, { useRef, useEffect } from 'react';
import './mobilejoystick.css';

const MobileJoystick = ({ onMove }) => {
  const joystickRef = useRef(null);
  const thumbRef = useRef(null);
  const dragging = useRef(false);
  const start = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const joystick = joystickRef.current;
    const thumb = thumbRef.current;

    const handleMove = (clientX, clientY) => {
      if (!dragging.current) return;

      const dx = clientX - start.current.x;
      const dy = clientY - start.current.y;
      const maxRadius = 40;

      const distance = Math.min(Math.sqrt(dx * dx + dy * dy), maxRadius);
      const angle = Math.atan2(dy, dx);

      const offsetX = distance * Math.cos(angle);
      const offsetY = distance * Math.sin(angle);

      thumb.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

      const normalizedX = offsetX / maxRadius;
      const normalizedY = offsetY / maxRadius;

      if (onMove) {
        onMove({ x: normalizedX, y: normalizedY });
      }
    };

    const handleStart = (e) => {
      dragging.current = true;
      const touch = e.touches?.[0] || e;
      start.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleEnd = () => {
      dragging.current = false;
      thumb.style.transform = 'translate(0px, 0px)';
      if (onMove) {
        onMove({ x: 0, y: 0 });
      }
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const touch = e.touches?.[0];
      if (touch) handleMove(touch.clientX, touch.clientY);
    };

    const handleMouseMove = (e) => {
      e.preventDefault();
      handleMove(e.clientX, e.clientY);
    };

    joystick.addEventListener('touchstart', handleStart);
    joystick.addEventListener('touchmove', handleTouchMove, { passive: false });
    joystick.addEventListener('touchend', handleEnd);
    joystick.addEventListener('mousedown', handleStart);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleEnd);

    return () => {
      joystick.removeEventListener('touchstart', handleStart);
      joystick.removeEventListener('touchmove', handleTouchMove);
      joystick.removeEventListener('touchend', handleEnd);
      joystick.removeEventListener('mousedown', handleStart);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
    };
  }, [onMove]);

  return (
    <div className="joystick-container">
      <div className="joystick-base" ref={joystickRef}>
        <div className="joystick-thumb" ref={thumbRef}></div>
      </div>
    </div>
  );
};

export default MobileJoystick;

