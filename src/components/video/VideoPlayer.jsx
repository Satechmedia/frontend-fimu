/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, Minimize, Settings, 
  SkipBack, SkipForward, Check, Loader, RotateCcw, RotateCw
} from 'lucide-react';
import { IconRewindForward10 } from '@tabler/icons-react';
import _ from 'lodash';

const VideoPlayer = ({ 
  videoUrl, 
  thumbnailUrl,
  qualities = [],
  title,
  className = '' 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [selectedQuality, setSelectedQuality] = useState(qualities[0]);
  const [showControls, setShowControls] = useState(true);
  const [buffered, setBuffered] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverTime, setHoverTime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch(e.key.toLowerCase()) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          break;
        case 'f':
          e.preventDefault();
          if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
          } else {
            document.exitFullscreen();
          }
          break;
        case 'm':
          e.preventDefault();
          setIsMuted(!isMuted);
          videoRef.current.muted = !isMuted;
          break;
        case 'arrowleft':
          e.preventDefault();
          handleSeek(Math.max(currentTime - 10, 0));
          break;
        case 'arrowright':
          e.preventDefault();
          handleSeek(Math.min(currentTime + 10, duration));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentTime, duration, isMuted]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlers = {
      loadedmetadata: () => {
        setDuration(video.duration);
        setIsLoading(false);
      },
      timeupdate: () => setCurrentTime(video.currentTime),
      progress: () => {
        if (video.buffered.length > 0) {
          setBuffered(video.buffered.end(video.buffered.length - 1));
        }
      },
      waiting: () => setIsLoading(true),
      playing: () => setIsLoading(false),
      canplay: () => setIsLoading(false)
    };

    Object.entries(handlers).forEach(([event, handler]) => {
      video.addEventListener(event, handler);
    });

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        video.removeEventListener(event, handler);
      });
    };
  }, []);

  const togglePlay = async () => {
    if (!videoRef.current) return;
    
    try {
      if (videoRef.current.paused) {
        await videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Playback error:', error);
    }
  };

  const handleSeek = (time) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleTimelineClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    handleSeek(pos * duration);
  };

  const handleSpeedChange = (speed) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = speed;
    setPlaybackSpeed(speed);
    setShowSpeedMenu(false);
    setShowSettings(false);
  };

  const handleQualityChange = (quality) => {
    if (!videoRef.current) return;
    const currentTime = videoRef.current.currentTime;
    const wasPlaying = !videoRef.current.paused;
    
    setSelectedQuality(quality);
    videoRef.current.src = quality.url;
    videoRef.current.currentTime = currentTime;
    
    if (wasPlaying) {
      videoRef.current.play();
    }
    setShowQualityMenu(false);
    setShowSettings(false);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      ref={containerRef}
      className={`relative group aspect-video bg-black ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setShowSettings(false);
      }}
    >
      <video
        ref={videoRef}
        className="w-full h-full"
        poster={thumbnailUrl}
        onClick={togglePlay}
        playsInline
      >
        <source src={selectedQuality?.url || videoUrl} type="video/mp4" />
      </video>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <Loader className="w-12 h-12 text-white animate-spin" />
        </div>
      )}

      {/* Video Title */}
      <div 
        className={`absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent
        transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
      >
        <h2 className="text-white font-medium truncate">{title}</h2>
      </div>

      {/* Controls */}
      <div 
        className={`absolute inset-0 flex flex-col justify-end
        transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Progress bar */}
        <div 
          className="relative h-1 bg-white/30 cursor-pointer mx-4 group/timeline"
          onClick={handleTimelineClick}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            setHoverTime(pos * duration);
          }}
          onMouseLeave={() => setHoverTime(null)}
        >
          {/* Buffer bar */}
          <div 
            className="absolute h-full bg-white/50"
            style={{ width: `${(buffered / duration) * 100}%` }}
          />
          {/* Progress */}
          <div 
            className="absolute h-full bg-blue-500"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover/timeline:opacity-100" />
          </div>
          {/* Hover time */}
          {hoverTime !== null && (
            <div 
              className="absolute -top-8 bg-black/90 text-white px-2 py-1 rounded text-sm transform -translate-x-1/2"
              style={{ left: `${(hoverTime / duration) * 100}%` }}
            >
              {formatTime(hoverTime)}
            </div>
          )}
        </div>

        {/* Control buttons */}
        <div className="px-4 py-3 bg-gradient-to-t from-black/60 via-black/40 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={togglePlay}
                className="text-white hover:text-blue-400 transition"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>

              <button 
                onClick={() => {
                  const newTime = Math.max(currentTime - 10, 0);
                  handleSeek(newTime);
                }}
                className="text-white hover:text-blue-400 transition group relative"
              >
                <RotateCcw size={24} />
                
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/75 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 ">
                  -10s
                </span>
              </button>

              <button 
                onClick={() => {
                  const newTime = Math.min(currentTime + 10, duration);
                  handleSeek(newTime);
                }}
                className="text-white hover:text-blue-400 transition group relative"
              >
                <RotateCw size={24} />
                <IconRewindForward10 size={24} />
                
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/20 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">
                  +10s
                </span>
              </button>

              <div className="flex items-center space-x-2 group">
                <button 
                  onClick={() => {
                    setIsMuted(!isMuted);
                    videoRef.current.muted = !isMuted;
                  }}
                  className="text-white hover:text-blue-400 transition"
                >
                  {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    setVolume(value);
                    videoRef.current.volume = value;
                    setIsMuted(value === 0);
                  }}
                  className="w-0 group-hover:w-20 transition-all"
                />
              </div>

              <div className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Settings Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white hover:text-blue-400 transition p-2 rounded hover:bg-white/10"
                >
                  <Settings size={20} className={showSettings ? "animate-spin" : ""} />
                </button>

                {showSettings && (
                  <div className="absolute bottom-full right-0 mb-2 w-48 bg-black/95 rounded-lg overflow-hidden">
                    {/* Main Settings Menu */}
                    {!showQualityMenu && !showSpeedMenu && (
                      <div className="p-2">
                        <button
                          onClick={() => setShowQualityMenu(true)}
                          className="w-full px-4 py-2 text-left text-white hover:bg-white/10 rounded flex items-center justify-between"
                        >
                          <span>Quality</span>
                          <span className="text-sm text-gray-400">{selectedQuality?.quality}</span>
                        </button>
                        <button
                          onClick={() => setShowSpeedMenu(true)}
                          className="w-full px-4 py-2 text-left text-white hover:bg-white/10 rounded flex items-center justify-between"
                        >
                          <span>Playback Speed</span>
                          <span className="text-sm text-gray-400">{playbackSpeed}x</span>
                        </button>
                      </div>
                    )}

                    {/* Quality Submenu */}
                    {showQualityMenu && (
                      <div className="p-2">
                        <div className="px-4 py-2 text-white text-sm font-medium border-b border-white/10">
                          Quality
                        </div>
                        {qualities.map(quality => (
                          <button
                            key={quality.quality}
                            onClick={() => handleQualityChange(quality)}
                            className="w-full px-4 py-2 text-left text-white hover:bg-white/10 rounded flex items-center justify-between"
                          >
                            {quality.quality}
                            {selectedQuality?.quality === quality.quality && (
                              <Check size={16} className="text-blue-400" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Speed Submenu */}
                    {showSpeedMenu && (
                      <div className="p-2">
                        <div className="px-4 py-2 text-white text-sm font-medium border-b border-white/10">
                          Playback Speed
                        </div>
                        {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 2].map(speed => (
                          <button
                            key={speed}
                            onClick={() => handleSpeedChange(speed)}
                            className="w-full px-4 py-2 text-left text-white hover:bg-white/10 rounded flex items-center justify-between"
                          >
                            {speed}x
                            {playbackSpeed === speed && (
                              <Check size={16} className="text-blue-400" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button 
                onClick={async () => {
                  if (!document.fullscreenElement) {
                    await containerRef.current.requestFullscreen();
                  } else {
                    await document.exitFullscreen();
                  }
                  setIsFullscreen(!isFullscreen);
                }}
                className="text-white hover:text-blue-400 transition"
              >
                {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Big Play Button */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="bg-black/50 rounded-full p-6 backdrop-blur-sm">
            <Play size={48} className="text-white" />
          </div>
        </button>
      )}
    </div>
  );
};

export default VideoPlayer;