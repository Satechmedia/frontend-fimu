/* eslint-disable react/prop-types */
// AdPlayer.jsx
import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Button } from '../common/Button';

export const AdPlayer = ({ adUrl, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [canSkip, setCanSkip] = useState(false);
  
  // Allow skip after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setCanSkip(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleProgress = ({ played }) => {
    setProgress(played);
    if (played >= 0.99) {
      onComplete();
    }
  };

  return (
    <div className="relative w-full h-full">
      <ReactPlayer
        url={adUrl}
        width="100%"
        height="100%"
        playing={true}
        controls={false}
        onProgress={handleProgress}
      />
      
      {/* Ad Controls */}
      <div className="absolute bottom-4 right-4 flex items-center space-x-4">
        {canSkip && (
          <Button
            variant="secondary"
            onClick={onComplete}
            className="bg-black/80 hover:bg-black/90"
          >
            Skip Ad
          </Button>
        )}
        {!canSkip && (
          <span className="text-white bg-black/80 px-4 py-2 rounded">
            Skip in {Math.ceil(5 - (progress * 5))}s
          </span>
        )}
      </div>
      
      {/* Ad Label */}
      <div className="absolute top-4 left-4">
        <span className="bg-yellow-400 text-black px-2 py-1 text-sm font-medium rounded">
          Ad
        </span>
      </div>
    </div>
  );
};
