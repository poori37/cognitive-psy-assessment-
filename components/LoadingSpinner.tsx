
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400"></div>
      <p className="text-sky-300">Checking with AI...</p>
    </div>
  );
};

export default LoadingSpinner;
