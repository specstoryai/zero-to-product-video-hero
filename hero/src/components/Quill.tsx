import React from 'react';
import {interpolate} from 'remotion';
import {colors} from '../styles/design-tokens';

interface QuillProps {
  progress: number;
  opacity: number;
  position: {
    top: string;
    left: string;
  };
}

export const Quill: React.FC<QuillProps> = ({progress, opacity, position}) => {
  // Writing motion - figure 8 pattern
  const xOffset = Math.sin(progress * Math.PI * 4) * 30;
  const yOffset = Math.sin(progress * Math.PI * 8) * 15;
  
  // Rotation based on writing motion
  const rotation = interpolate(
    progress,
    [0, 0.5, 1],
    [-10, 5, -10],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    }
  );
  
  return (
    <div
      style={{
        position: 'absolute',
        ...position,
        transform: `translate(${xOffset}px, ${yOffset}px) rotate(${rotation}deg)`,
        opacity,
        transformOrigin: 'bottom left',
        zIndex: 10
      }}
    >
      {/* Quill shaft */}
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        style={{
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))'
        }}
      >
        {/* Feather */}
        <path
          d="M 30 150 Q 20 100, 40 50 Q 45 30, 50 20 Q 52 15, 55 12 Q 58 10, 60 12 Q 62 15, 64 20 Q 69 30, 74 50 Q 94 100, 84 150"
          fill="white"
          stroke={colors.medieval.ink}
          strokeWidth="2"
        />
        
        {/* Feather details */}
        <path
          d="M 40 80 L 50 70 M 50 90 L 55 80 M 55 100 L 60 90 M 60 110 L 65 100"
          stroke={colors.medieval.ink}
          strokeWidth="1"
          opacity="0.5"
        />
        
        {/* Quill tip */}
        <path
          d="M 55 150 L 57 180 L 59 150"
          fill={colors.medieval.ink}
          stroke={colors.medieval.ink}
          strokeWidth="1"
        />
        
        {/* Ink on tip */}
        <circle
          cx="57"
          cy="180"
          r="3"
          fill={colors.medieval.ink}
          opacity={interpolate(progress, [0, 0.1, 0.9, 1], [1, 0.5, 0.5, 1])}
        />
      </svg>
      
      {/* Ink trail */}
      {progress > 0.1 && (
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            left: 57,
            width: 2,
            height: 30,
            background: colors.medieval.ink,
            opacity: interpolate(progress, [0.1, 0.2, 0.8, 0.9], [0, 0.3, 0.3, 0]),
            transform: 'translateX(-50%)'
          }}
        />
      )}
    </div>
  );
};