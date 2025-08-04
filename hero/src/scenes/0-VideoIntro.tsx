import React from 'react';
import {AbsoluteFill, Video, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig, Img} from 'remotion';
import {colors, typography} from '../styles/design-tokens';

interface VideoIntroProps {
  src: string;
  startFrom?: number;
  endAt?: number;
}

export const VideoIntro: React.FC<VideoIntroProps> = ({ 
  src, 
  startFrom = 0,
  endAt
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  // Fade in/out effect
  const opacity = interpolate(
    frame,
    [0, 20, (endAt || 150) - 10, endAt || 150],
    [0, 1, 1, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    }
  );
  
  // Text overlay animations
  const firstTextSpring = spring({
    fps,
    frame: frame - 15, // Start at 0.5 seconds
    config: {
      damping: 100,
      stiffness: 200
    }
  });
  
  const secondTextSpring = spring({
    fps,
    frame: frame - 90, // Start at 3 seconds (after first text shows for 2.5 seconds)
    config: {
      damping: 100,
      stiffness: 200
    }
  });
  
  // Text fade out - each text shows for 2.5 seconds (75 frames)
  const firstTextOpacity = interpolate(
    frame,
    [15, 30, 75, 90],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    }
  );
  
  const secondTextOpacity = interpolate(
    frame,
    [90, 105, 135, 150],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    }
  );
  
  // SpecStory logo animation - appears before second text
  const iconSpring = spring({
    fps,
    frame: frame - 85, // Start just before second text
    config: {
      damping: 100,
      stiffness: 200
    }
  });
  
  const iconOpacity = interpolate(
    frame,
    [85, 95, 145, 150],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    }
  );
  
  return (
    <AbsoluteFill style={{backgroundColor: colors.background.dark}}>
      <Video
        src={staticFile(src)}
        startFrom={startFrom}
        endAt={endAt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity
        }}
      />
      
      {/* Dark overlay for better text contrast */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)',
          opacity
        }}
      />
      
      {/* Text overlays */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 60
        }}
      >
        {/* First text: "We've always preserved our intent" */}
        <h1
          style={{
            position: 'absolute',
            fontFamily: typography.fonts.outfit,
            fontSize: typography.sizes['6xl'],
            color: colors.text.inverse,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            textShadow: '0 4px 20px rgba(0,0,0,0.8)',
            transform: `scale(${firstTextSpring}) translateY(${frame > 75 ? (frame - 75) * (frame - 75) * 0.5 : 0}px)`,
            opacity: firstTextOpacity,
            whiteSpace: 'nowrap'
          }}
        >
          We've always preserved our intent
        </h1>
        
        {/* Second text: "What makes today any different?" */}
        <h1
          style={{
            position: 'absolute',
            fontFamily: typography.fonts.outfit,
            fontSize: typography.sizes['6xl'],
            color: colors.text.inverse,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            textShadow: '0 4px 20px rgba(0,0,0,0.8)',
            transform: `scale(${secondTextSpring}) translateY(${frame > 140 ? (frame - 140) * (frame - 140) * 0.5 : 0}px)`,
            opacity: secondTextOpacity,
            whiteSpace: 'nowrap'
          }}
        >
          What makes today any different?
        </h1>
        
        {/* SpecStory logo - positioned above second text */}
        <div
          style={{
            position: 'absolute',
            top: '30%',
            opacity: iconOpacity,
            transform: `scale(${iconSpring}) translateY(${frame > 140 ? (frame - 140) * (frame - 140) * 0.5 : 0}px)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20
          }}
        >
          <Img
            src={staticFile('specstorylogo-inverted.svg')}
            style={{
              width: 600,
              height: 'auto',
              filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.8))'
            }}
          />
        </div>
      </AbsoluteFill>
      
      {/* Fade to black for smooth transition */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#000000',
          opacity: interpolate(
            frame,
            [(endAt || 150) - 15, endAt || 150],
            [0, 1],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp'
            }
          )
        }}
      />
    </AbsoluteFill>
  );
};