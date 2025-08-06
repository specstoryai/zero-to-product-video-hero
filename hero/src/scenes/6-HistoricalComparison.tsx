import React from 'react';
import {AbsoluteFill, Video, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';
import {colors, typography} from '../styles/design-tokens';

export const HistoricalComparison: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const totalDuration = 300; // 10 seconds at 30fps
  
  // Animation phases
  const SPLIT_REVEAL = 20;
  const TEXT_REVEAL = 60;
  const COMPARISON_START = 120;
  const FADE_OUT_START = 270;
  
  // Split screen reveal animation
  const splitReveal = interpolate(
    frame,
    [0, SPLIT_REVEAL],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    }
  );
  
  // Text animations
  const titleOpacity = interpolate(
    frame,
    [TEXT_REVEAL, TEXT_REVEAL + 20],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    }
  );
  
  const titleSpring = spring({
    fps,
    frame: frame - TEXT_REVEAL,
    config: {
      damping: 100,
      stiffness: 200
    }
  });
  
  // Comparison text stagger
  const comparisons = [
    { past: "Handwritten manuscripts", present: "AI-generated code", delay: 0 },
    { past: "Physical preservation", present: "Digital memory", delay: 20 },
    { past: "Human scribes", present: "AI assistants", delay: 40 },
    { past: "Centuries to evolve", present: "Seconds to iterate", delay: 60 }
  ];
  
  // Final message animation
  const finalMessageOpacity = interpolate(
    frame,
    [220, 250],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    }
  );
  
  // Fade out
  const fadeOut = interpolate(
    frame,
    [FADE_OUT_START, totalDuration],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    }
  );
  
  return (
    <AbsoluteFill style={{backgroundColor: '#000000'}}>
      {/* Split screen container */}
      <AbsoluteFill style={{display: 'flex', flexDirection: 'row'}}>
        {/* Left side - Historical (Monk) */}
        <div
          style={{
            position: 'relative',
            width: '50%',
            height: '100%',
            overflow: 'hidden',
            transform: `translateX(${(1 - splitReveal) * -100}%)`
          }}
        >
          <Video
            src={staticFile('intro.mp4')}
            style={{
              width: '200%',
              height: '100%',
              objectFit: 'cover',
              transform: 'translateX(0%)'
            }}
          />
          
          {/* Overlay gradient */}
          <AbsoluteFill
            style={{
              background: 'linear-gradient(to right, rgba(139,69,19,0.3), rgba(139,69,19,0.6))',
              mixBlendMode: 'multiply'
            }}
          />
          
          {/* Historical label */}
          <div
            style={{
              position: 'absolute',
              top: 60,
              left: 40,
              opacity: titleOpacity
            }}
          >
            <h2
              style={{
                fontFamily: typography.fonts.outfit,
                fontSize: 48,
                fontWeight: 700,
                color: '#D4AF37',
                textShadow: '0 4px 20px rgba(0,0,0,0.8)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              Then
            </h2>
            <p
              style={{
                fontFamily: typography.fonts.dmSans,
                fontSize: 24,
                fontWeight: 400,
                color: 'rgba(255,255,255,0.8)',
                marginTop: 10
              }}
            >
              Preserving knowledge
            </p>
          </div>
        </div>
        
        {/* Center divider */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            width: 4,
            height: '100%',
            background: `linear-gradient(to bottom, 
              transparent 0%, 
              ${colors.modern.monitorGlow} 20%, 
              ${colors.modern.monitorGlow} 80%, 
              transparent 100%)`,
            transform: `translateX(-50%) scaleY(${splitReveal})`,
            boxShadow: `0 0 40px ${colors.modern.monitorGlow}`,
            zIndex: 10
          }}
        />
        
        {/* Right side - Modern (Woman) */}
        <div
          style={{
            position: 'relative',
            width: '50%',
            height: '100%',
            overflow: 'hidden',
            transform: `translateX(${(1 - splitReveal) * 100}%)`
          }}
        >
          <Video
            src={staticFile('modern.mp4')}
            style={{
              width: '200%',
              height: '100%',
              objectFit: 'cover',
              transform: 'translateX(-50%)'
            }}
          />
          
          {/* Overlay gradient with acid colors */}
          <AbsoluteFill
            style={{
              background: 'linear-gradient(to left, rgba(0,255,255,0.2), rgba(255,0,255,0.2))',
              mixBlendMode: 'screen'
            }}
          />
          
          {/* Modern label */}
          <div
            style={{
              position: 'absolute',
              top: 60,
              right: 40,
              opacity: titleOpacity
            }}
          >
            <h2
              style={{
                fontFamily: typography.fonts.outfit,
                fontSize: 48,
                fontWeight: 700,
                background: 'linear-gradient(90deg, #00ffff, #ff00ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 4px 20px rgba(0,0,0,0.8)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textAlign: 'right',
                filter: 'drop-shadow(0 0 20px rgba(255, 0, 255, 0.6))'
              }}
            >
              Now
            </h2>
            <p
              style={{
                fontFamily: typography.fonts.dmSans,
                fontSize: 24,
                fontWeight: 400,
                color: 'rgba(255,255,255,0.8)',
                marginTop: 10,
                textAlign: 'right'
              }}
            >
              Preserving intent
            </p>
          </div>
        </div>
      </AbsoluteFill>
      
      {/* Comparison text overlay */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 80,
          pointerEvents: 'none'
        }}
      >
        {/* Main title */}
        <h1
          style={{
            fontFamily: typography.fonts.outfit,
            fontSize: 72,
            fontWeight: 800,
            color: colors.text.inverse,
            textAlign: 'center',
            transform: `scale(${titleSpring})`,
            opacity: titleOpacity,
            marginBottom: 60,
            textShadow: '0 8px 32px rgba(0,0,0,0.8)',
            letterSpacing: '-0.02em'
          }}
        >
          The Intent Remains The Same
        </h1>
        
        {/* Comparison items */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 30,
            width: '100%',
            maxWidth: 1200
          }}
        >
          {comparisons.map((item, i) => {
            const itemOpacity = interpolate(
              frame,
              [COMPARISON_START + item.delay, COMPARISON_START + item.delay + 20],
              [0, 1],
              {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp'
              }
            );
            
            const slideIn = interpolate(
              frame,
              [COMPARISON_START + item.delay, COMPARISON_START + item.delay + 20],
              [50, 0],
              {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp'
              }
            );
            
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  opacity: itemOpacity,
                  transform: `translateY(${slideIn}px)`,
                  gap: 40
                }}
              >
                {/* Past */}
                <div
                  style={{
                    flex: 1,
                    textAlign: 'right',
                    paddingRight: 40
                  }}
                >
                  <span
                    style={{
                      fontFamily: typography.fonts.dmSans,
                      fontSize: 32,
                      fontWeight: 500,
                      color: '#D4AF37',
                      textShadow: '0 2px 10px rgba(0,0,0,0.6)'
                    }}
                  >
                    {item.past}
                  </span>
                </div>
                
                {/* Arrow */}
                <div
                  style={{
                    fontSize: 40,
                    color: colors.modern.monitorGlow,
                    textShadow: `0 0 20px ${colors.modern.monitorGlow}`,
                    animation: `pulse ${2}s infinite`
                  }}
                >
                  →
                </div>
                
                {/* Present */}
                <div
                  style={{
                    flex: 1,
                    textAlign: 'left',
                    paddingLeft: 40
                  }}
                >
                  <span
                    style={{
                      fontFamily: typography.fonts.dmSans,
                      fontSize: 32,
                      fontWeight: 500,
                      background: 'linear-gradient(90deg, #00ffff, #ff00ff)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 0 10px rgba(255, 0, 255, 0.4))'
                    }}
                  >
                    {item.present}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Final message */}
        <div
          style={{
            marginTop: 80,
            opacity: finalMessageOpacity,
            transform: `scale(${spring({
              fps,
              frame: frame - 220,
              config: {
                damping: 100,
                stiffness: 200
              }
            })})`
          }}
        >
          <h2
            style={{
              fontFamily: typography.fonts.outfit,
              fontSize: 56,
              fontWeight: 700,
              textAlign: 'center',
              background: `linear-gradient(90deg, 
                #D4AF37 0%, 
                ${colors.modern.monitorGlow} 50%, 
                #ff00ff 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 8px 32px rgba(0,0,0,0.8)',
              filter: 'drop-shadow(0 0 30px rgba(0, 212, 255, 0.5))',
              letterSpacing: '-0.01em',
              lineHeight: 1.2
            }}
          >
            From scrolls to screens
          </h2>
          <p
            style={{
              fontFamily: typography.fonts.dmSans,
              fontSize: 36,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.9)',
              textAlign: 'center',
              marginTop: 20,
              textShadow: '0 4px 16px rgba(0,0,0,0.6)'
            }}
          >
            Intent is eternal
          </p>
        </div>
      </AbsoluteFill>
      
      {/* Fade to black */}
      <AbsoluteFill
        style={{
          background: '#000000',
          opacity: fadeOut,
          pointerEvents: 'none'
        }}
      />
    </AbsoluteFill>
  );
};