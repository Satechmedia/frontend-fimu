/* eslint-disable react/prop-types */
// VideoPlayer.jsx
import { useState, useCallback, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useVideoAd } from '../../hooks/useAds';
import { AdPlayer } from '../ads/AdPlayer';

export const VideoPlayer = ({ videoUrl, videoId }) => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showAd, setShowAd] = useState(false);
  const playerRef = useRef(null);
  
  const { data: ad } = useVideoAd(videoId);

  const handleProgress = useCallback(({ played }) => {
    setProgress(played);
    
    // Show ad at specific points (e.g., 25%, 50%, 75%)
    if (ad && !showAd) {
      const adTriggerPoints = [0.25, 0.5, 0.75];
      if (adTriggerPoints.some(point => 
        played >= point && played <= point + 0.01
      )) {
        setShowAd(true);
        setPlaying(false);
      }
    }
  }, [ad, showAd]);

  const handleAdComplete = useCallback(() => {
    setShowAd(false);
    setPlaying(true);
  }, []);

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      {/* Ad Overlay */}
      {showAd && ad && (
        <div className="absolute inset-0 z-20">
          <AdPlayer
            adUrl={ad.url}
            onComplete={handleAdComplete}
          />
        </div>
      )}
      
      {/* Video Player */}
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        width="100%"
        height="100%"
        playing={playing}
        controls={true}
        onProgress={handleProgress}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        className="absolute top-0 left-0"
        config={{
          file: {
            attributes: {
              controlsList: 'nodownload', // Disable download button
              disablePictureInPicture: true, // Disable PiP
            },
          },
        }}
      />
      
      {/* Custom Controls Overlay (optional) */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
  );
};