import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig, Video, staticFile} from 'remotion';
import {colors, typography} from '../styles/design-tokens';

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
            color: colors.text.inverse,
            textShadow: `0 8px 32px rgba(0,0,0,0.8)`,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginBottom: 20
          }}
        >
          {textToStream.slice(0, charsToShow)}
          <span style={{
            opacity: Math.sin(frame * 0.3) * 0.5 + 0.5,
            color: colors.modern.monitorGlow
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
            color: colors.text.inverse,
            opacity: subTextOpacity * 0.9,
            textAlign: 'center',
            maxWidth: 900,
            lineHeight: 1.4,
            textShadow: '0 4px 16px rgba(0,0,0,0.6)',
            marginTop: -10
          }}
        >
          You don't write prompts. You <span style={{fontWeight: 700}}>author intent</span>.
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};