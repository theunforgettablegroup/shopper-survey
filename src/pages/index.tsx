import React from 'react';
import { useRouter } from 'next/router';
import { AnalyticsBanner } from '../components/AnalyticsBanner';

const Landing: React.FC = () => {
  const router = useRouter();

  const handleStart = () => {
    router.push('/survey');
  };

  return (
    <>
      <AnalyticsBanner />
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: 'url(/images/bg.png)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          // background: 'linear-gradient(135deg, #FFD600 0%, #F7B32B 100%)',
          fontFamily: 'Montserrat, Arial, sans-serif',
          padding: '0 1rem',
        }}
      >
        <h1
          style={{
            fontSize: '2.5rem',
            color: '#FFF',
            marginBottom: '2rem',
            textAlign: 'center',
            textShadow: '0 2px 8px rgba(2, 2, 2, 0.45)',
          }}
        >
          What&apos;s your online shopping personality?
        </h1>
        <button
          onClick={handleStart}
          style={{
            padding: '1rem 2.5rem',
            fontSize: '1.25rem',
            background: '#FFD600',
            color: '#222',
            border: 'none',
            borderRadius: '2rem',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          Start the Journey
        </button>
      </div>
    </>
  );
};

export default Landing;
