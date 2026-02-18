import React from 'react';
import { useRouter } from 'next/router';
import ProfileCard from '../components/ProfileCard';
import Link from 'next/link';

const mainColors = {
  yellow: '#FFD600',
  accent: '#F7B32B',
  dark: '#222222',
  white: '#FFFFFF',
};

const Results: React.FC = () => {
  const router = useRouter();
  const { profile } = router.query;

  const handleRestart = () => {
    router.push('/');
  };

  const handleViewAllProfiles = () => {
    if (profile) {
      router.push(`/all-profiles?profile=${profile}`);
    } else {
      router.push('/all-profiles');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        // background: `linear-gradient(135deg, ${mainColors.yellow} 0%, ${mainColors.accent} 100%)`,
        backgroundImage: 'url(/images/bg.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Montserrat, Arial, sans-serif',
        padding: '2rem 1rem',
        position: 'relative',
      }}
    >
      <div
        style={{
          background: mainColors.white,
          borderRadius: '1.5rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          maxWidth: '420px',
          width: '100%',
          padding: '2rem 1.5rem',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            color: mainColors.accent,
            fontWeight: 700,
            fontSize: '2rem',
            marginBottom: '2rem',
            letterSpacing: '0.02em',
          }}
        >
          Your Shopper Profile
        </h1>
        {profile ? (
          <ProfileCard type={profile as string} />
        ) : (
          <p style={{ color: mainColors.dark }}>
            No profile data available. Please complete the questionnaire.
          </p>
        )}
                    {/* No description for string profile here; handled in ProfileCard or below */}
        <div style={{ maxWidth: 900, margin: '2rem auto' }}>
          <p style={{ textAlign: 'center', color: '#222', marginBottom: '2rem' }}>
            We may all take on different shopping roles based on the current need on hand, but we
            all have an underlying shopping style that drives how we shop or don't shop in some
            cases. Shopping should be as enjoyable as possible and the team at The Unforgettable
            Group is working hard to make that happen. Visit{' '}
            <Link
              style={{ color: '#222', fontWeight: 700, textDecoration: 'underline' }}
              href="https://wildlovetails.com"
            >
              wildlovetails.com
            </Link>{' '}
            our inaugural online shopping site dedicated to pets and their people. We have many more
            product categories. Follow us to stay in the know.
          </p>
        </div>
        {/* Desktop/Tablet buttons */}
        <div
          className="results-buttons-desktop"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            marginTop: '2rem',
          }}
        >
          <button
            onClick={handleRestart}
            style={{
              padding: '0.75rem 1.5rem',
              background: mainColors.yellow,
              color: mainColors.dark,
              fontWeight: 700,
              fontSize: '1rem',
              border: 'none',
              borderRadius: '0.75rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              cursor: 'pointer',
              transition: 'background 0.2s',
              width: '100%',
            }}
          >
            Restart Quiz
          </button>
          <button
            onClick={handleViewAllProfiles}
            style={{
              padding: '0.75rem 1.5rem',
              background: mainColors.accent,
              color: mainColors.white,
              fontWeight: 700,
              fontSize: '1rem',
              border: 'none',
              borderRadius: '0.75rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              cursor: 'pointer',
              transition: 'background 0.2s',
              width: '100%',
            }}
          >
            View All Shopper Profiles
          </button>
        </div>
      </div>
      {/* Mobile-only sticky button container */}
      <div
        className="results-buttons-mobile"
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255,255,255,0.97)',
          boxShadow: '0 -2px 16px rgba(0,0,0,0.08)',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          zIndex: 100,
          maxWidth: 420,
          margin: '0 auto',
          // Hide on desktop/tablet
          // display: 'none',
        }}
      >
        <button
          onClick={handleRestart}
          style={{
            padding: '0.75rem 1.5rem',
            background: mainColors.yellow,
            color: mainColors.dark,
            fontWeight: 700,
            fontSize: '1rem',
            border: 'none',
            borderRadius: '0.75rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            cursor: 'pointer',
            transition: 'background 0.2s',
            width: '100%',
          }}
        >
          Restart Quiz
        </button>
        <button
          onClick={handleViewAllProfiles}
          style={{
            padding: '0.75rem 1.5rem',
            background: mainColors.accent,
            color: mainColors.white,
            fontWeight: 700,
            fontSize: '1rem',
            border: 'none',
            borderRadius: '0.75rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            cursor: 'pointer',
            transition: 'background 0.2s',
            width: '100%',
          }}
        >
          View All Shopper Profiles
        </button>
      </div>
      <style>{`
        @media (max-width: 600px) {
          .results-buttons-desktop {
            display: none !important;
          }
          .results-buttons-mobile {
            display: flex !important;
          }
        }
        @media (min-width: 601px) {
          .results-buttons-mobile {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Results;
