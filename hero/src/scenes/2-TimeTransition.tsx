import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Video, staticFile} from 'remotion';
import {colors} from '../styles/design-tokens';

interface TimeTransitionProps {
  reverse?: boolean;
}

export const TimeTransition: React.FC<TimeTransitionProps> = ({reverse = false}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  // Fade in/out
  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  
  const fadeOut = interpolate(frame, [105, 120], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  
  const opacity = fadeIn * fadeOut;
  
  return (
    <AbsoluteFill style={{backgroundColor: '#000000'}}>
      {/* Time tunnel video */}
      <Video
        src={staticFile('time tunnel.mp4')}
        startFrom={6} // Start 0.20 seconds (6 frames) into the video
        endAt={126} // Still 4 seconds total duration
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity
        }}
      />
      
      {/* Additional fade to black at end for smooth transition */}
      <AbsoluteFill
        style={{
          background: '#000000',
          opacity: interpolate(frame, [100, 120], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
          })
        }}
      />
    </AbsoluteFill>
  );
};