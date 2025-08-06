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
  
  // Apple-style subtle blur effect
  const blurAmount = interpolate(
    frame,
    [0, 30, 120, 150],
    [20, 0, 0, 10],
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
      
      {/* Apple-style gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.3) 100%)',
          opacity,
          backdropFilter: `blur(${blurAmount}px)`,
          WebkitBackdropFilter: `blur(${blurAmount}px)`
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
        {/* First text: "We've always preserved our intent" - Apple style */}
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            transform: `scale(${firstTextSpring}) translateY(${frame > 75 ? (frame - 75) * (frame - 75) * 0.3 : 0}px)`,
            opacity: firstTextOpacity,
          }}
        >
          <h1
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize: 80,
              color: '#f5f5f7',
              fontWeight: 600,
              letterSpacing: '-0.003em',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)',
              whiteSpace: 'nowrap',
              lineHeight: 1.08365,
              textAlign: 'center',
              margin: 0
            }}
          >
            We've always preserved
          </h1>
          <h1
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize: 80,
              color: '#f5f5f7',
              fontWeight: 600,
              letterSpacing: '-0.003em',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)',
              whiteSpace: 'nowrap',
              lineHeight: 1.08365,
              textAlign: 'center',
              margin: 0,
              background: 'linear-gradient(90deg, #f5f5f7 0%, #86868b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            our intent.
          </h1>
        </div>
        
        {/* Second text: "What makes today any different?" - Apple style */}
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            transform: `scale(${secondTextSpring}) translateY(${frame > 140 ? (frame - 140) * (frame - 140) * 0.3 : 0}px)`,
            opacity: secondTextOpacity,
          }}
        >
          <h1
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize: 72,
              color: '#86868b',
              fontWeight: 400,
              letterSpacing: '0.004em',
              textShadow: '0 1px 5px rgba(0,0,0,0.2)',
              whiteSpace: 'nowrap',
              lineHeight: 1.1,
              textAlign: 'center',
              margin: 0
            }}
          >
            What makes today
          </h1>
          <h1
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize: 72,
              fontWeight: 600,
              letterSpacing: '-0.003em',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)',
              whiteSpace: 'nowrap',
              lineHeight: 1.08365,
              textAlign: 'center',
              margin: 0,
              background: 'linear-gradient(90deg, #0071e3 0%, #00d4ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            any different?
          </h1>
        </div>
        
        {/* SpecStory logo - Apple style presentation */}
        <div
          style={{
            position: 'absolute',
            top: '28%',
            opacity: iconOpacity,
            transform: `scale(${iconSpring}) translateY(${frame > 140 ? (frame - 140) * (frame - 140) * 0.3 : 0}px)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20
          }}
        >
          <div
            style={{
              padding: '40px 60px',
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              borderRadius: 24,
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            <Img
              src={staticFile('specstorylogo-inverted.svg')}
              style={{
                width: 500,
                height: 'auto',
                filter: 'brightness(1.1) contrast(1.05)'
              }}
            />
          </div>
        </div>
      </AbsoluteFill>
      
      {/* Apple-style fade transition */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(0,0,0,0.95) 0%, #000000 100%)',
          opacity: interpolate(
            frame,
            [(endAt || 150) - 15, endAt || 150],
            [0, 1],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp'
            }
          ),
          backdropFilter: `blur(${interpolate(frame, [(endAt || 150) - 15, endAt || 150], [0, 20])}px)`,
          WebkitBackdropFilter: `blur(${interpolate(frame, [(endAt || 150) - 15, endAt || 150], [0, 20])}px)`
        }}
      />
    </AbsoluteFill>
  );
};