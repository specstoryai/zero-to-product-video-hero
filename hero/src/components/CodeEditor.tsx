import React from 'react';
import {interpolate} from 'remotion';
import {colors, typography} from '../styles/design-tokens';

interface CodeEditorProps {
  progress: number;
}

type LineType = 'comment' | 'keyword' | 'syntax' | 'code' | 'boolean' | 'empty';

interface CodeLine {
  type: LineType;
  content: string;
  continuation?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({progress}) => {
  const codeLines: CodeLine[] = [
    {type: 'comment', content: '// SpecStory: Capture user authentication intent'},
    {type: 'keyword', content: 'export const', continuation: ' authenticateUser = '},
    {type: 'keyword', content: 'async', continuation: ' (credentials: UserCredentials) '},
    {type: 'syntax', content: '=> {'},
    {type: 'comment', content: '  // Intent: Validate user credentials securely'},
    {type: 'code', content: '  const validated = await validateCredentials(credentials);'},
    {type: 'empty', content: ''},
    {type: 'comment', content: '  // Intent: Generate secure session token'},
    {type: 'keyword', content: '  if', continuation: ' (validated) {'},
    {type: 'code', content: '    const token = generateSecureToken(credentials.userId);'},
    {type: 'keyword', content: '    return', continuation: ' { success: '},
    {type: 'boolean', content: 'true', continuation: ', token };'},
    {type: 'syntax', content: '  }'},
    {type: 'syntax', content: '};'}
  ];
  
  const syntaxColors: Record<LineType, string> = {
    comment: '#6A9955',
    keyword: '#569CD6',
    syntax: colors.modern.codeText,
    code: colors.modern.codeText,
    boolean: '#569CD6',
    empty: 'transparent'
  };
  
  return (
    <div
      style={{
        padding: 24,
        fontFamily: typography.fonts.mono,
        fontSize: typography.sizes.base,
        lineHeight: 1.6,
        height: '100%',
        overflowY: 'auto'
      }}
    >
      {/* Editor header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 20,
          paddingBottom: 12,
          borderBottom: `1px solid ${colors.modern.codeText}20`
        }}
      >
        <div style={{display: 'flex', gap: 8}}>
          <div style={{width: 12, height: 12, borderRadius: '50%', background: '#FF5F56'}} />
          <div style={{width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E'}} />
          <div style={{width: 12, height: 12, borderRadius: '50%', background: '#27C93F'}} />
        </div>
        <div
          style={{
            marginLeft: 20,
            fontSize: typography.sizes.sm,
            color: colors.modern.codeText,
            opacity: 0.6
          }}
        >
          auth.service.ts - SpecStory Enhanced
        </div>
      </div>
      
      {/* Code content */}
      <div>
        {codeLines.map((line, lineIndex) => {
          const lineProgress = interpolate(
            progress,
            [lineIndex / codeLines.length, (lineIndex + 1) / codeLines.length],
            [0, 1],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp'
            }
          );
          
          return (
            <div
              key={lineIndex}
              style={{
                marginBottom: 4,
                opacity: lineProgress,
                transform: `translateX(${(1 - lineProgress) * 10}px)`
              }}
            >
              <span style={{color: colors.modern.codeText, opacity: 0.3, marginRight: 16}}>
                {String(lineIndex + 1).padStart(2, '0')}
              </span>
              
              {line.content.split('').map((char, charIndex) => {
                const charProgress = interpolate(
                  lineProgress,
                  [charIndex / line.content.length, (charIndex + 1) / line.content.length],
                  [0, 1],
                  {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp'
                  }
                );
                
                return (
                  <span
                    key={charIndex}
                    style={{
                      color: syntaxColors[line.type],
                      opacity: charProgress
                    }}
                  >
                    {char}
                  </span>
                );
              })}
              
              {line.continuation && (
                <span style={{color: syntaxColors[line.type]}}>
                  {line.continuation}
                </span>
              )}
            </div>
          );
        })}
        
        {/* Cursor */}
        <span
          style={{
            display: 'inline-block',
            width: 2,
            height: 20,
            background: colors.modern.codeText,
            marginLeft: 4,
            animation: 'blink 1s ease-in-out infinite',
            opacity: interpolate(progress, [0.9, 1], [1, 0])
          }}
        />
      </div>
      
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};