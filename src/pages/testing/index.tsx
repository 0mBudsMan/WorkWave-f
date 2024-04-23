// pages/index.tsx

import React from 'react';
import CircularLoader from '@/components/CircularLoader';

const Testing: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Next.js</h1>
      <p>This is a basic page in Next.js.</p>
      <CircularLoader />
    </div>
  );
};

export default Testing;
