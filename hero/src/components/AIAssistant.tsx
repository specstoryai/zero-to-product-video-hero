import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {colors, typography} from '../styles/design-tokens';

export const AIAssistant: React.FC = () => {
  const frame = useCurrentFrame();
  
  // Pulsing effect for AI suggestion
  const pulse = Math.sin(frame * 0.1) * 0.05 + 1;
  
  return (
    <div
      style={{
        background: 'rgba(0, 212, 255, 0.05)',
        border: '1px solid rgba(0, 212, 255, 0.3)',
        borderRadius: 8,
        padding: 16,
        width: 300,
        boxShadow: `0 4px 20px rgba(0, 212, 255, ${0.2 * pulse})`,
        transform: `scale(${pulse})`
      }}
    >
      {/* AI Assistant header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 12
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 4,
            background: `linear-gradient(135deg, ${colors.modern.monitorGlow} 0%, #0080FF 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 'bold',
            color: 'white'
          }}
        >
          AI
        </div>
        <span
          style={{
            fontFamily: typography.fonts.sans,
            fontSize: typography.sizes.sm,
            color: colors.modern.codeText,
            opacity: 0.8
          }}
        >
          SpecStory AI Suggestion
        </span>
      </div>
      
      {/* Suggestion content */}
      <div
        style={{
          fontFamily: typography.fonts.mono,
          fontSize: typography.sizes.sm,
          color: colors.modern.codeText,
          lineHeight: 1.6
        }}
      >
        <div style={{marginBottom: 8, opacity: 0.6}}>
          Based on your intent, consider:
        </div>
        <div
          style={{
            paddingLeft: 12,
            borderLeft: `2px solid ${colors.modern.monitorGlow}`,
            opacity: 0.9
          }}
        >
          <div>• Add rate limiting to prevent brute force</div>
          <div>• Log authentication attempts for security</div>
          <div>• Implement 2FA for enhanced security</div>
        </div>
      </div>
      
      {/* Action buttons */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginTop: 12
        }}
      >
        <button
          style={{
            background: colors.modern.monitorGlow,
            color: colors.modern.codeEditor,
            border: 'none',
            borderRadius: 4,
            padding: '6px 12px',
            fontSize: typography.sizes.xs,
            fontFamily: typography.fonts.sans,
            cursor: 'pointer',
            fontWeight: 500
          }}
        >
          Apply All
        </button>
        <button
          style={{
            background: 'transparent',
            color: colors.modern.codeText,
            border: `1px solid ${colors.modern.codeText}30`,
            borderRadius: 4,
            padding: '6px 12px',
            fontSize: typography.sizes.xs,
            fontFamily: typography.fonts.sans,
            cursor: 'pointer'
          }}
        >
          Customize
        </button>
      </div>
    </div>
  );
};