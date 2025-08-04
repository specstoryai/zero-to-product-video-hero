import React from 'react';
import {colors} from '../styles/design-tokens';

interface CandleGlowProps {
  position: {
    top: string;
    right?: string;
    left?: string;
  };
  intensity: number;
  opacity: number;
}

export const CandleGlow: React.FC<CandleGlowProps> = ({position, intensity, opacity}) => {
  return (
    <div
      style={{
        position: 'absolute',
        ...position,
        opacity
      }}
    >
      {/* Candle body */}
      <div
        style={{
          width: 40,
          height: 120,
          background: 'linear-gradient(to bottom, #f4e6d7 0%, #d4a574 100%)',
          borderRadius: '4px 4px 8px 8px',
          position: 'relative',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
        }}
      >
        {/* Melted wax drips */}
        <div
          style={{
            position: 'absolute',
            top: 5,
            left: 5,
            width: 15,
            height: 30,
            background: '#f4e6d7',
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            opacity: 0.8
          }}
        />
      </div>
      
      {/* Flame */}
      <div
        style={{
          position: 'absolute',
          top: -30,
          left: '50%',
          transform: `translateX(-50%) scale(${intensity})`,
          transformOrigin: 'bottom center'
        }}
      >
        {/* Outer flame */}
        <div
          style={{
            width: 20,
            height: 35,
            background: `radial-gradient(ellipse at center bottom, ${colors.medieval.candleGlow} 0%, transparent 70%)`,
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            filter: 'blur(2px)',
            animation: 'flicker 2s ease-in-out infinite'
          }}
        />
        
        {/* Inner flame */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 12,
            height: 20,
            background: `radial-gradient(ellipse at center bottom, #fff 0%, ${colors.medieval.candleLight} 50%, transparent 100%)`,
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            filter: 'blur(1px)'
          }}
        />
      </div>
      
      {/* Glow effect */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300 * intensity,
          height: 300 * intensity,
          background: `radial-gradient(circle, ${colors.medieval.candleGlow}20 0%, transparent 60%)`,
          borderRadius: '50%',
          filter: 'blur(20px)',
          pointerEvents: 'none'
        }}
      />
      
      <style>{`
        @keyframes flicker {
          0%, 100% { transform: translateX(-50%) scale(1) skewX(0deg); }
          25% { transform: translateX(-48%) scale(1.05) skewX(-2deg); }
          50% { transform: translateX(-52%) scale(0.95) skewX(2deg); }
          75% { transform: translateX(-49%) scale(1.02) skewX(-1deg); }
        }
      `}</style>
    </div>
  );
};