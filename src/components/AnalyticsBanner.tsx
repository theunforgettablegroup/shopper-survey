// Add at the top of your page component (e.g., in src/pages/results.tsx or index.tsx)
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export const AnalyticsBanner: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('hideAnalyticsBanner') === 'true') {
      setVisible(false);
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem('hideAnalyticsBanner', 'true');
  };

  if (!visible) return null;

  return (
    <div
      style={{
        background: '#fffbe6',
        color: '#222',
        padding: '0.75rem 2rem',
        textAlign: 'center',
        fontSize: '0.95rem',
        borderBottom: '1px solid #ffe58f',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        fontFamily: 'Montserrat, Arial, sans-serif',
      }}
    >
      <span>
        We collect anonymous analytics data (browser, device, location) to improve the survey
        experience.{' '}
        <Link href="/privacy-policy" style={{ color: '#222', textDecoration: 'underline' }}>
          Privacy Policy
        </Link>
      </span>
      <button
        onClick={handleClose}
        style={{
          background: 'none',
          border: 'none',
          color: '#222',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          cursor: 'pointer',
        }}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
};
