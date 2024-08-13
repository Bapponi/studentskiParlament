import React, { useEffect, useRef } from 'react';
import './video-player.css';

interface VideoPlayerProps {
  src: string;
  width?: string;
  height?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, width = '100%', height = 'auto' }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Effect to handle video source updates
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Reloads the video
    }
  }, [src]);

  return (
    <div className="video-player">
      <video ref={videoRef} controls width={width} height={height}>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
