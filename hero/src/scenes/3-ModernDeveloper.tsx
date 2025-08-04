import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig, Img, staticFile, Easing} from 'remotion';
import {colors, typography} from '../styles/design-tokens';
import {ModernIDE} from '../components/ModernIDE';
import {ParticleEffect} from '../components/ParticleEffect';

export const ModernDeveloper: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  // Scene fade in
  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  
  // Monitor glow pulsing
  const glowIntensity = Math.sin(frame * 0.05) * 0.2 + 0.8;
  
  // Code typing progress
  const codeProgress = interpolate(frame, [20, 100], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  
  // AI suggestion appearing
  const aiSuggestionSpring = spring({
    fps,
    frame: frame - 60,
    config: {
      damping: 100,
      stiffness: 200
    }
  });
  
  return (
    <AbsoluteFill style={{backgroundColor: '#000000'}}>
      {/* Digital particles */}
      <ParticleEffect count={20} color={colors.modern.monitorGlow} />
      
      {/* Monitor/Screen */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${interpolate(
            frame,
            [110, 170],
            [1, 1.8],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.25, 0.1, 0.25, 1)
            }
          )}) translateX(${interpolate(
            frame,
            [110, 170],
            [0, 400],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.25, 0.1, 0.25, 1)
            }
          )}px) translateY(${interpolate(
            frame,
            [110, 170],
            [0, 100],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.25, 0.1, 0.25, 1)
            }
          )}px)`,
          opacity: fadeIn,
          transformOrigin: 'center center'
        }}
      >
        {/* Monitor frame */}
        <div
          style={{
            width: 1600,
            height: 900,
            background: '#000',
            borderRadius: 16,
            padding: 8,
            boxShadow: `0 30px 80px rgba(0,0,0,0.8), 0 0 ${40 * glowIntensity}px rgba(0,212,255,0.3)`,
            position: 'relative'
          }}
        >
          
          {/* Screen content */}
          <div
            style={{
              width: '100%',
              height: '100%',
              background: '#1e1e1e',
              borderRadius: 8,
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <ModernIDE progress={codeProgress} />
          </div>
        </div>
      </div>
      
      
      {/* "SpecStory saved" notification */}
      <div
        style={{
          position: 'absolute',
          top: '75%',
          left: '50%',
          transform: `translate(-50%, -50%) translateY(${interpolate(
            frame,
            [100, 110],
            [20, 0],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp'
            }
          )}px)`,
          opacity: interpolate(frame, [100, 110, 180, 190], [0, 1, 1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
          }),
          zIndex: 100
        }}
      >
        <div
          style={{
            background: 'rgba(0, 212, 255, 0.15)',
            border: '2px solid rgba(0, 212, 255, 0.6)',
            borderRadius: 12,
            padding: '24px 40px',
            fontFamily: typography.fonts.outfit,
            fontSize: typography.sizes['2xl'],
            fontWeight: 600,
            color: colors.modern.monitorGlow,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            boxShadow: '0 8px 32px rgba(0, 212, 255, 0.3)'
          }}
        >
          <Img
            src={staticFile('specstorylogo-inverted.svg')}
            style={{
              height: 40,
              width: 'auto',
              filter: 'drop-shadow(0 0 8px rgba(0, 212, 255, 0.6))'
            }}
          />
          <span style={{flex: 1, whiteSpace: 'nowrap'}}>
            AI Conversation saved to history
          </span>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: colors.modern.monitorGlow,
              animation: 'pulse 2s ease-in-out infinite',
              boxShadow: `0 0 20px ${colors.modern.monitorGlow}`
            }}
          />
        </div>
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </AbsoluteFill>
  );
};