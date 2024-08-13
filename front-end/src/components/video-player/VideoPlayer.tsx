import React from 'react';
import './video-player.css';

interface VideoPlayerProps {
  src: string;
  width?: string;
  height?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, width = '100%', height = 'auto' }) => {
  return (
    <div className="video-player">
      <video controls width={width} height={height}>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
