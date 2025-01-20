'use client';

import { useEffect, useState } from 'react';

export const LoadingBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 5000; // 5 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + increment;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className='w-full bg-gray-200 rounded-full h-4'>
      <div
        className='h-full bg-primary-main rounded-full transition-all duration-75 ease-linear'
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
