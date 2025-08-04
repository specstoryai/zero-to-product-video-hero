import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig, Img, staticFile, Easing} from 'remotion';
import {colors, typography} from '../styles/design-tokens';

export const BenefitsAndLogos: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const totalDuration = 540; // 18 seconds at 30fps
  
  // Scene phases
  const BENEFITS_START = 0;
  const LOGOS_START = 210; // Increased from 180 to add ~1 second delay
  const CTA_START = 330; // Adjusted accordingly
  
  // Fade in
  const fadeIn = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  
  // Title animation
  const titleSpring = spring({
    fps,
    frame: frame - 10,
    config: {
      damping: 100,
      stiffness: 200
    }
  });
  
  // Benefits stagger in
  const benefits = [
    "All your prompts auto-saved",
    "Build rules for AI", 
    "Share intent with your team",
    "Keep context with your code"
  ];
  
  // Logo data with larger sizes
  const logos = [
    { name: 'cursor', size: 140 },
    { name: 'claude', size: 140 },
    { name: 'copilot', size: 140 }
  ];
  
  // Benefits phase visibility
  const benefitsOpacity = interpolate(
    frame,
    [BENEFITS_START, BENEFITS_START + 30, LOGOS_START - 30, LOGOS_START],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    }
  );
  
  // Logos phase visibility
  const logosOpacity = interpolate(
    frame,
    [LOGOS_START, LOGOS_START + 30, CTA_START - 30, CTA_START],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    }
  );
  
  // CTA phase visibility
  const ctaOpacity = interpolate(
    frame,
    [CTA_START, CTA_START + 30],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    }
  );
  
  return (
    <AbsoluteFill style={{backgroundColor: '#000000'}}>
      {/* Animated gradient background */}
      <AbsoluteFill>
        <div
          style={{
            position: 'absolute',
            width: '200%',
            height: '200%',
            left: '-50%',
            top: '-50%',
            background: `radial-gradient(circle at ${50 + Math.sin(frame * 0.02) * 20}% ${50 + Math.cos(frame * 0.02) * 20}%, ${colors.modern.monitorGlow}20 0%, transparent 50%)`,
            opacity: fadeIn
          }}
        />
      </AbsoluteFill>
      
      {/* Benefits Section */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 80,
          opacity: benefitsOpacity
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontFamily: typography.fonts.outfit,
            fontSize: 80,
            fontWeight: 800,
            color: colors.text.inverse,
            textAlign: 'center',
            transform: `scale(${titleSpring})`,
            marginBottom: 30,
            lineHeight: 1.1,
            letterSpacing: '-0.03em'
          }}
        >
          Save the WHY behind AI codegen
        </h1>
        
        {/* Benefits grid */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 50,
            width: '100%',
            maxWidth: 900,
            alignItems: 'center'
          }}
        >
          {benefits.map((benefit, i) => {
            const benefitProgress = interpolate(
              frame,
              [40 + i * 20, 55 + i * 20],
              [0, 1],
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
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 40,
                  opacity: benefitProgress,
                  transform: `translateX(${(1 - benefitProgress) * -100}px)`,
                  width: '100%'
                }}
              >
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${colors.modern.monitorGlow}, ${colors.modern.monitorGlow}80)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: `0 0 40px ${colors.modern.monitorGlow}60`
                  }}
                >
                  <span style={{color: '#000', fontSize: 48, fontWeight: 'bold', lineHeight: 1}}>✓</span>
                </div>
                <span
                  style={{
                    fontFamily: typography.fonts.dmSans,
                    fontSize: 36,
                    color: colors.text.inverse,
                    fontWeight: 500,
                    letterSpacing: '-0.01em',
                    flex: 1,
                    maxWidth: 600
                  }}
                >
                  {benefit}
                </span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      
      {/* Logos Section */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 80,
          opacity: logosOpacity
        }}
      >
        <h2
          style={{
            fontFamily: typography.fonts.outfit,
            fontSize: 64,
            fontWeight: 700,
            color: colors.text.inverse,
            textAlign: 'center',
            marginBottom: 80,
            letterSpacing: '-0.02em'
          }}
        >
          Available everywhere you work
        </h2>
        
        {/* Logos showcase */}
        <div
          style={{
            display: 'flex',
            gap: 100,
            alignItems: 'flex-start',
            justifyContent: 'center'
          }}
        >
          {logos.map((logo, i) => {
            const logoSpring = spring({
              fps,
              frame: frame - LOGOS_START - 20 - i * 10,
              config: {
                damping: 100,
                stiffness: 200
              }
            });
            
            const hover = Math.sin((frame + i * 30) * 0.05) * 10;
            
            const labels = ['Cursor', 'Claude Code', 'GitHub Copilot'];
            const labelOpacity = interpolate(
              frame,
              [LOGOS_START + 40 + i * 15, LOGOS_START + 55 + i * 15],
              [0, 1],
              {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp'
              }
            );
            
            return (
              <div
                key={logo.name}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 20,
                  transform: `scale(${logoSpring}) translateY(${hover}px)`,
                  opacity: logoSpring
                }}
              >
                <div
                  style={{
                    padding: 40,
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: 30,
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Img
                    src={staticFile(`${logo.name}.svg`)}
                    style={{
                      width: logo.size,
                      height: logo.size,
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                      display: 'block'
                    }}
                  />
                </div>
                
                {/* Label for this logo */}
                <div
                  style={{
                    fontFamily: typography.fonts.dmSans,
                    fontSize: 24,
                    color: 'rgba(255, 255, 255, 0.7)',
                    letterSpacing: '0.01em',
                    fontWeight: 500,
                    opacity: labelOpacity,
                    transform: `translateY(${(1 - labelOpacity) * 10}px)`,
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    minWidth: 200,
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  {labels[i]}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      
      {/* Final CTA Section */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 80,
          opacity: ctaOpacity
        }}
      >
        {/* SpecStory Logo */}
        <Img
          src={staticFile('specstorylogo-inverted.svg')}
          style={{
            width: 600,
            height: 'auto',
            marginBottom: 50,
            filter: 'drop-shadow(0 12px 40px rgba(0,0,0,0.5))'
          }}
        />
        
        {/* CTA Button */}
        <div
          style={{
            background: `linear-gradient(135deg, ${colors.modern.monitorGlow}, ${colors.modern.monitorGlow}CC)`,
            padding: '36px 100px',
            borderRadius: 80,
            boxShadow: `0 20px 60px ${colors.modern.monitorGlow}40`,
            transform: `scale(${spring({
              fps,
              frame: frame - CTA_START - 20,
              config: {
                damping: 100,
                stiffness: 200
              }
            })})`,
            cursor: 'pointer'
          }}
        >
          <span
            style={{
              fontFamily: typography.fonts.dmSans,
              fontSize: 36,
              fontWeight: 600,
              color: '#000',
              letterSpacing: '-0.01em'
            }}
          >
            Enhance your AI workflow today
          </span>
        </div>
        
        {/* Download link */}
        <div
          style={{
            marginTop: 50,
            opacity: interpolate(frame, [CTA_START + 40, CTA_START + 60], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp'
            }),
            transform: `translateY(${interpolate(frame, [CTA_START + 40, CTA_START + 60], [20, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp'
            })}px)`
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '20px 40px',
              background: 'rgba(0, 212, 255, 0.1)',
              border: '2px solid rgba(0, 212, 255, 0.4)',
              borderRadius: 40,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <span style={{fontSize: 36}}>🔗</span>
            <p
              style={{
                fontFamily: typography.fonts.dmSans,
                fontSize: 42,
                fontWeight: 600,
                color: colors.modern.monitorGlow,
                textAlign: 'center',
                letterSpacing: '0.01em',
                textDecoration: 'underline',
                textUnderlineOffset: 8,
                margin: 0
              }}
            >
              get.specstory.com/extension
            </p>
          </div>
        </div>
        
        {/* Stats counters */}
        <div
          style={{
            display: 'flex',
            gap: 40,
            marginTop: 50,
            opacity: interpolate(frame, [CTA_START + 80, CTA_START + 100], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp'
            })
          }}
        >
          {[
            { value: 100883, label: 'Installs', rate: 2 },
            { value: 4294574, label: 'Sessions saved', rate: 50 },
            { value: 175916, label: 'Rules generated', rate: 5 }
          ].map((stat, i) => {
            // Count for 3 seconds (90 frames at 30fps)
            const countDuration = 90;
            const countStart = CTA_START + 100 + i * 10;
            const countEnd = countStart + countDuration;
            
            // Calculate how many increments based on frame
            const elapsedFrames = Math.max(0, frame - countStart);
            const incrementsPerFrame = stat.rate / 30; // Convert rate per second to rate per frame
            
            // Add the increments to the base value
            const currentValue = Math.floor(stat.value + (elapsedFrames * incrementsPerFrame));
            
            // Ensure we don't count past the end duration
            const displayValue = frame > countEnd ? 
              Math.floor(stat.value + (countDuration * incrementsPerFrame)) : 
              currentValue;
            
            return (
              <div
                key={stat.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 12,
                  background: 'rgba(0, 212, 255, 0.08)',
                  border: '2px solid rgba(0, 212, 255, 0.3)',
                  borderRadius: 20,
                  padding: '30px 40px',
                  minWidth: 280,
                  boxShadow: '0 8px 32px rgba(0, 212, 255, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <span
                  style={{
                    fontFamily: typography.fonts.outfit,
                    fontSize: 72,
                    fontWeight: 700,
                    color: colors.modern.monitorGlow,
                    letterSpacing: '-0.02em',
                    textShadow: `0 0 30px ${colors.modern.monitorGlow}40`,
                    lineHeight: 1
                  }}
                >
                  {displayValue.toLocaleString()}
                </span>
                <span
                  style={{
                    fontFamily: typography.fonts.dmSans,
                    fontSize: 24,
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.8)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em'
                  }}
                >
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      
      {/* Animated background particles */}
      <AbsoluteFill style={{opacity: 0.3}}>
        {Array.from({length: 20}).map((_, i) => {
          const particleProgress = (frame / 100 + i * 0.05) % 1;
          const x = Math.sin(i * 2) * 50 + 50;
          const y = particleProgress * 100;
          
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${x}%`,
                top: `${y}%`,
                width: 4,
                height: 4,
                background: colors.modern.monitorGlow,
                borderRadius: '50%',
                opacity: 1 - particleProgress,
                boxShadow: `0 0 10px ${colors.modern.monitorGlow}`
              }}
            />
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};