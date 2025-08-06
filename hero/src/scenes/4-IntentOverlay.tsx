import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig, Video, staticFile} from 'remotion';
import {typography} from '../styles/design-tokens';

export const IntentOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  // Text streaming animation - character by character
  const textToStream = "Intent is the new source code";
  const charsToShow = Math.floor(interpolate(
    frame,
    [20, 80],
    [0, textToStream.length],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    }
  ));
  
  // Subtitle fade in
  const subTextOpacity = interpolate(frame, [85, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  
  return (
    <AbsoluteFill>
      {/* Background video */}
      <AbsoluteFill>
        <Video
          src={staticFile('modern.mp4')}
          startFrom={0}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        
        {/* Dark overlay for text readability */}
        <AbsoluteFill
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7))'
          }}
        />
      </AbsoluteFill>
      
      {/* Main text overlay */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 40
        }}
      >
        {/* Main headline with streaming effect */}
        <h1
          style={{
            fontFamily: typography.fonts.outfit,
            fontSize: typography.sizes['7xl'],
            fontWeight: 800,
            textAlign: 'center',
            background: `linear-gradient(90deg, 
              #00ff00 0%, 
              #ffff00 20%, 
              #ff00ff 40%, 
              #00ffff 60%, 
              #ff0099 80%, 
              #00ff00 100%)`,
            backgroundSize: '200% 100%',
            backgroundPosition: `${interpolate(frame, [0, 100], [0, 100])}% 0`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: `
              0 0 40px rgba(0, 255, 0, 0.8),
              0 0 80px rgba(255, 0, 255, 0.6),
              0 0 120px rgba(0, 255, 255, 0.4)
            `,
            filter: `drop-shadow(0 0 20px rgba(255, 255, 0, 0.8))`,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginBottom: 20
          }}
        >
          {textToStream.slice(0, charsToShow)}
          <span style={{
            opacity: Math.sin(frame * 0.3) * 0.5 + 0.5,
            color: '#00ff00',
            textShadow: '0 0 20px #00ff00',
            WebkitTextFillColor: '#00ff00'
          }}>
            {charsToShow < textToStream.length ? '|' : ''}
          </span>
        </h1>
        
        {/* Subtitle */}
        <p
          style={{
            fontFamily: typography.fonts.dmSans,
            fontSize: typography.sizes['3xl'],
            fontWeight: 400,
            color: '#ffff00',
            opacity: subTextOpacity * 0.9,
            textAlign: 'center',
            maxWidth: 900,
            lineHeight: 1.4,
            textShadow: `
              0 0 20px rgba(255, 255, 0, 0.8),
              0 0 40px rgba(255, 0, 255, 0.6),
              0 4px 16px rgba(0,0,0,0.6)
            `,
            filter: `drop-shadow(0 0 10px rgba(0, 255, 255, 0.6))`,
            marginTop: -10
          }}
        >
          You don't write prompts. You <span style={{
            fontWeight: 700,
            background: 'linear-gradient(90deg, #ff00ff, #00ffff, #ff00ff)',
            backgroundSize: '200% 100%',
            backgroundPosition: `${interpolate(frame, [0, 100], [-100, 100])}% 0`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 15px rgba(255, 0, 255, 0.8))'
          }}>author intent</span>.
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};