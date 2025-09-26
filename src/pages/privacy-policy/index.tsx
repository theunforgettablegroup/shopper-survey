import React from 'react';

const PrivacyPolicy: React.FC = () => (
  <div
    style={{
      maxWidth: 600,
      margin: '4rem auto',
      padding: '2rem',
      background: '#fff',
      borderRadius: '1rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    }}
  >
    <h1>Privacy Policy</h1>
    <p>
      We collect anonymous analytics data such as browser type, device information, screen size, and
      approximate location to improve the survey experience. No personally identifiable information
      is collected or stored.
    </p>
    <p>If you have questions about our data practices, please contact us.</p>
  </div>
);

export default PrivacyPolicy;
