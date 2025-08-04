import React from 'react';
import {interpolate} from 'remotion';
import {colors, typography} from '../styles/design-tokens';

interface ParchmentProps {
  textProgress: number;
}

export const Parchment: React.FC<ParchmentProps> = ({textProgress}) => {
  const manuscriptText = [
    "In principio erat Verbum,",
    "et Verbum erat apud Deum,",
    "Knowledge preserved in ink,",
    "Intent captured in script..."
  ];
  
  return (
    <div
      style={{
        width: 600,
        height: 400,
        background: `linear-gradient(135deg, ${colors.medieval.parchment} 0%, ${colors.medieval.parchmentDark} 100%)`,
        borderRadius: 4,
        boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
        padding: 40,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Parchment texture overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.3,
          background: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(139, 69, 19, 0.1) 10px,
              rgba(139, 69, 19, 0.1) 20px
            )
          `
        }}
      />
      
      {/* Aged edges effect */}
      <div
        style={{
          position: 'absolute',
          inset: -2,
          background: `radial-gradient(ellipse at center, transparent 70%, rgba(139, 69, 19, 0.3) 100%)`,
          pointerEvents: 'none'
        }}
      />
      
      {/* Manuscript text */}
      <div style={{position: 'relative', zIndex: 1}}>
        {manuscriptText.map((line, index) => {
          const lineProgress = interpolate(
            textProgress,
            [index * 0.25, (index + 1) * 0.25],
            [0, 1],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp'
            }
          );
          
          return (
            <div
              key={index}
              style={{
                fontFamily: typography.fonts.serif,
                fontSize: typography.sizes.xl,
                color: colors.medieval.ink,
                marginBottom: 20,
                opacity: lineProgress,
                transform: `translateX(${(1 - lineProgress) * 20}px)`,
                fontStyle: index < 2 ? 'italic' : 'normal',
                letterSpacing: '0.05em'
              }}
            >
              {line.split('').map((char, charIndex) => (
                <span
                  key={charIndex}
                  style={{
                    opacity: interpolate(
                      lineProgress,
                      [charIndex / line.length, (charIndex + 1) / line.length],
                      [0, 1],
                      {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp'
                      }
                    )
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          );
        })}
      </div>
      
      {/* Decorative initial letter */}
      <div
        style={{
          position: 'absolute',
          top: 35,
          left: 35,
          fontSize: 60,
          fontFamily: typography.fonts.serif,
          color: colors.medieval.ink,
          fontWeight: 'bold',
          opacity: interpolate(textProgress, [0, 0.1], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
          }),
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}
      >
        I
      </div>
    </div>
  );
};