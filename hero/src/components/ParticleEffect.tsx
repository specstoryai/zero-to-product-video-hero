import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';

interface ParticleEffectProps {
  count: number;
  color: string;
}

export const ParticleEffect: React.FC<ParticleEffectProps> = ({count, color}) => {
  const frame = useCurrentFrame();
  
  return (
    <>
      {Array.from({length: count}).map((_, i) => {
        // Random but deterministic values for each particle
        const seed = i * 137.5; // Golden angle for better distribution
        const x = (Math.sin(seed) + 1) * 50; // 0-100%
        const startY = (Math.cos(seed) + 1) * 50; // 0-100%
        const speed = 0.2 + (Math.sin(seed * 2) + 1) * 0.3; // 0.2-0.8
        const size = 1 + (Math.cos(seed * 3) + 1) * 1.5; // 1-4
        const delay = (Math.sin(seed * 4) + 1) * 60; // 0-120 frames
        
        // Calculate current position
        const progress = ((frame - delay) * speed) % 120;
        const y = startY - (progress / 120) * 100;
        
        // Fade in/out
        const opacity = interpolate(
          progress,
          [0, 20, 100, 120],
          [0, 0.6, 0.6, 0],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
          }
        );
        
        // Slight horizontal drift
        const xDrift = Math.sin((frame + i * 10) * 0.02) * 10;
        
        if (progress < 0) return null;
        
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${x + xDrift}%`,
              top: `${y}%`,
              width: size,
              height: size,
              borderRadius: '50%',
              background: color,
              opacity,
              filter: 'blur(1px)',
              pointerEvents: 'none'
            }}
          />
        );
      })}
    </>
  );
};