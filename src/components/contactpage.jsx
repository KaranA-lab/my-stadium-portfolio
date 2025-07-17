import React from 'react';

export default function ContactPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#1c1c1c',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem',
        fontFamily: 'Oswald, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '4rem',
          maxWidth: '1200px',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Left Section – Text Content */}
        <div style={{ flex: 1, maxWidth: '600px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
            CONTACT ME
          </h1>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
            Hey there, legend! 👋 You’ve just wandered into a fully 3D football
            stadium portfolio – yep, I designed and built the whole thing myself (ball
            included). I’m Karan, a UI/UX designer who loves mixing user-friendly
            design with a bit of “wait, how did he do that?” flair.
            <br />
            <br />
            Each goalpost in here links to one of my projects – so feel free to
            explore like you’re chasing a hat-trick. Got questions, ideas, job
            offers, or just want to say hi? Slide into my inbox like you’re
            scoring the winning goal – I promise I’ll reply without a red card.
          </p>

          {/* Resume Button (Downloadable) */}
          <a
            href="/resume.pdf"
            download
            style={{
              display: 'inline-block',
              padding: '0.8rem 1.5rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              border: '2px solid white',
              backgroundColor: 'transparent',
              color: 'white',
              borderRadius: '1.5rem',
              cursor: 'pointer',
              textDecoration: 'none',
              fontFamily: 'Oswald, sans-serif',
            }}
          >
            Download Resume
          </a>

          {/* Contact Info */}
          <div style={{ marginTop: '2rem', fontSize: '1rem', lineHeight: 2 }}>
            <div>
              📞 <strong>+44 7393066821</strong>
            </div>
            <div>📍 <strong>London, United Kingdom</strong></div>
            <div>🌐 <strong>karananilkumar.com</strong></div>
          </div>
        </div>

        {/* Right Section – Image */}
        <div style={{ flex: 1, position: 'relative', maxWidth: '400px' }}>
          <div
            style={{
              border: '4px solid white',
              position: 'absolute',
              top: '-20px',
              left: '-20px',
              width: '100%',
              height: '100%',
              zIndex: 0,
            }}
          />
          <img
            src="/assets/contact-photo.jpg"
            alt="Karan at London Eye"
            style={{
              width: '100%',
              height: 'auto',
              border: '4px solid white',
              position: 'relative',
              zIndex: 1,
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </div>
  );
}
