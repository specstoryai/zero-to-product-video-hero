import React from 'react';
import {interpolate} from 'remotion';
import {colors, typography} from '../styles/design-tokens';

interface ModernIDEProps {
  progress: number;
}

type LineType = 'keyword' | 'comment' | 'property' | 'jsx' | 'text' | 'string' | 'number';

interface CodeLine {
  indent: number;
  type: LineType;
  text: string;
  continuation?: string;
}

export const ModernIDE: React.FC<ModernIDEProps> = ({progress}) => {
  const codeLines: CodeLine[] = [
    {indent: 0, type: 'keyword', text: 'export'},
    {indent: 0, type: 'keyword', text: 'const', continuation: ' MedevelDeveloper: React.FC = () => {'},
    {indent: 1, type: 'keyword', text: 'const', continuation: ' frame = useCurrentFrame();'},
    {indent: 1, type: 'keyword', text: 'const', continuation: ' {fps} = useVideoConfig();'},
    {indent: 0, type: 'text', text: ''},
    {indent: 1, type: 'comment', text: '// Scene fade in'},
    {indent: 1, type: 'keyword', text: 'const', continuation: ' fadeIn = interpolate(frame, 0, 20, [0, 1], {'},
    {indent: 2, type: 'property', text: 'extrapolateLeft:', continuation: " 'clamp',"},
    {indent: 2, type: 'property', text: 'extrapolateRight:', continuation: " 'clamp'"},
    {indent: 1, type: 'text', text: '});'},
    {indent: 0, type: 'text', text: ''},
    {indent: 1, type: 'keyword', text: 'return', continuation: ' ('},
    {indent: 2, type: 'jsx', text: '<AbsoluteFill', continuation: ' style={{backgroundColor: colors.modern.codeEditor}}>'},
    {indent: 3, type: 'comment', text: '// Monitor glow pulsing'},
    {indent: 3, type: 'jsx', text: '<div', continuation: ' style={{'},
    {indent: 4, type: 'property', text: 'position:', continuation: " 'absolute',"},
    {indent: 4, type: 'property', text: 'inset:', continuation: ' 0,'},
    {indent: 3, type: 'text', text: '}} />'},
    {indent: 2, type: 'jsx', text: '</AbsoluteFill>'},
    {indent: 1, type: 'text', text: ');'},
    {indent: 0, type: 'text', text: '};'}
  ];

  const syntaxColors: Record<LineType, string> = {
    keyword: '#569CD6',
    comment: '#6A9955',
    property: '#9CDCFE',
    jsx: '#E06C75',
    text: colors.modern.codeText,
    string: '#CE9178',
    number: '#B5CEA8'
  };

  // AI assistant panel content
  // Animation phases
  const PROMPT_START = 0.1;
  const ACCEPT_START = 0.3;
  const CODE_STREAM_START = 0.4;
  const HISTORY_APPEAR_START = 0.75;
  
  const promptText = "Build an app together";

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        fontFamily: typography.fonts.mono,
        fontSize: 14,
        background: '#1e1e1e'
      }}
    >
      {/* Left sidebar */}
      <div
        style={{
          width: 280,
          background: '#252526',
          borderRight: '1px solid #3e3e42',
          overflowY: 'auto',
          fontSize: 13
        }}
      >
        {/* File explorer */}
        <div style={{padding: 8}}>
          <div style={{fontSize: 11, color: '#CCCCCC', marginBottom: 8}}>
            EXPLORER
          </div>
          
          {/* Regular project files */}
          <div style={{marginBottom: 16}}>
            {['WEBSITE_REDO', '.claude', '.cursor', '.github'].map((folder) => (
              <div
                key={folder}
                style={{
                  padding: '2px 8px',
                  color: '#CCCCCC',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 13
                }}
              >
                <span style={{color: '#C5C5C5', fontSize: 10}}>
                  {folder === 'WEBSITE_REDO' ? '▼' : '▶'}
                </span>
                {folder}
              </div>
            ))}
          </div>
          
          {/* SpecStory folder appears after AI interaction */}
          <div
            style={{
              opacity: interpolate(progress, [HISTORY_APPEAR_START, HISTORY_APPEAR_START + 0.1], [0, 1]),
              transform: `translateY(${interpolate(progress, [HISTORY_APPEAR_START, HISTORY_APPEAR_START + 0.1], [10, 0])}px)`
            }}
          >
            {/* .specstory folder */}
            <div
              style={{
                padding: '2px 8px',
                color: '#CCCCCC',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                backgroundColor: interpolate(progress, [HISTORY_APPEAR_START + 0.05, HISTORY_APPEAR_START + 0.15, 0.95], [0, 0.1, 0]) > 0 ? 'rgba(0, 212, 255, 0.1)' : 'transparent',
                borderRadius: 4,
                transition: 'background-color 0.3s'
              }}
            >
              <span style={{color: '#C5C5C5', fontSize: 10}}>▼</span>
              <span style={{color: interpolate(progress, [HISTORY_APPEAR_START + 0.05, HISTORY_APPEAR_START + 0.1], [0, 1]) > 0.5 ? '#00D4FF' : '#CCCCCC'}}>
                .specstory
              </span>
            </div>
            
            {/* Nested items */}
            <div style={{paddingLeft: 16}}>
              <div
                style={{
                  padding: '2px 8px',
                  color: '#CCCCCC',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  opacity: interpolate(progress, [HISTORY_APPEAR_START + 0.02, HISTORY_APPEAR_START + 0.12], [0, 1])
                }}
              >
                <span style={{color: '#C5C5C5', fontSize: 10}}>▶</span> ai_rules_backups
              </div>
              
              {/* History folder expanded */}
              <div
                style={{
                  padding: '2px 8px',
                  color: '#CCCCCC',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  opacity: interpolate(progress, [HISTORY_APPEAR_START + 0.04, HISTORY_APPEAR_START + 0.14], [0, 1])
                }}
              >
                <span style={{color: '#C5C5C5', fontSize: 10}}>▼</span>
                <span style={{color: '#00D4FF'}}>history</span>
              </div>
              
              {/* History files */}
              <div style={{paddingLeft: 32}}>
                {[
                  '2025-07-28_18-38Z-build-an-app-together.md',
                  '2025-04-29_13-24Z-testing-and-experimentation-discussion.md',
                  '2025-04-28_18-41Z-endpoints-for-stats-in-@page-tsx.md',
                  '2025-04-28_00-33Z-text-formatting-to-one-line.md'
                ].map((file, i) => (
                  <div
                    key={file}
                    style={{
                      padding: '2px 8px',
                      color: '#CCCCCC',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: 12,
                      opacity: interpolate(
                        progress,
                        [HISTORY_APPEAR_START + 0.06 + i * 0.02, HISTORY_APPEAR_START + 0.16 + i * 0.02],
                        [0, 1]
                      ),
                      transform: `translateX(${interpolate(
                        progress,
                        [HISTORY_APPEAR_START + 0.06 + i * 0.02, HISTORY_APPEAR_START + 0.16 + i * 0.02],
                        [-10, 0]
                      )}px)`,
                      backgroundColor: file.includes('build-an-app-together') && interpolate(progress, [HISTORY_APPEAR_START + 0.15, HISTORY_APPEAR_START + 0.2], [0, 1]) > 0.5 
                        ? 'rgba(0, 212, 255, 0.15)' 
                        : 'transparent',
                      borderRadius: 3
                    }}
                  >
                    <span style={{color: '#519aba', fontSize: 14}}>📄</span>
                    <span style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      color: file.includes('build-an-app-together') ? '#00D4FF' : '#CCCCCC'
                    }}>
                      {file}
                    </span>
                  </div>
                ))}
              </div>
              
              <div
                style={{
                  padding: '2px 8px',
                  color: '#CCCCCC',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  opacity: interpolate(progress, [HISTORY_APPEAR_START + 0.08, HISTORY_APPEAR_START + 0.18], [0, 1])
                }}
              >
                <span style={{color: '#C5C5C5', fontSize: 10}}>▶</span> .gitignore
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main editor */}
      <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
        {/* Tabs */}
        <div
          style={{
            height: 35,
            background: '#2d2d30',
            borderBottom: '1px solid #3e3e42',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 12
          }}
        >
          <div
            style={{
              background: '#1e1e1e',
              padding: '6px 12px',
              borderRadius: '4px 4px 0 0',
              fontSize: 13,
              color: '#CCCCCC',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <span style={{color: '#519aba'}}>{'<>'}</span>
            3-ModernDeveloper.tsx
            <span style={{fontSize: 10, marginLeft: 4}}>●</span>
          </div>
        </div>

        {/* Code content */}
        <div
          style={{
            flex: 1,
            padding: '12px 0',
            overflowY: 'auto',
            position: 'relative'
          }}
        >
          {/* Line numbers and code */}
          {codeLines.map((line, lineIndex) => {
            const lineProgress = interpolate(
              progress,
              [CODE_STREAM_START + lineIndex * 0.01, CODE_STREAM_START + lineIndex * 0.01 + 0.02],
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
                  display: 'flex',
                  opacity: lineProgress,
                  height: 20
                }}
              >
                {/* Line number */}
                <div
                  style={{
                    width: 50,
                    textAlign: 'right',
                    paddingRight: 16,
                    color: '#858585',
                    fontSize: 12,
                    userSelect: 'none'
                  }}
                >
                  {lineIndex + 1}
                </div>
                
                {/* Code */}
                <div
                  style={{
                    paddingLeft: line.indent * 20,
                    color: syntaxColors[line.type] || syntaxColors.text
                  }}
                >
                  {line.text}
                  {line.continuation && (
                    <span style={{color: syntaxColors.text}}>
                      {line.continuation}
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {/* Cursor */}
          <div
            style={{
              position: 'absolute',
              left: 60,
              top: 12 + 20 * Math.min(Math.floor((progress - CODE_STREAM_START) / (1 - CODE_STREAM_START) * codeLines.length), codeLines.length - 1),
              width: 2,
              height: 20,
              background: '#AEAFAD',
              animation: 'blink 1s ease-in-out infinite',
              opacity: interpolate(progress, [CODE_STREAM_START, CODE_STREAM_START + 0.05, 0.85, 0.9], [0, 1, 1, 0])
            }}
          />
        </div>

        {/* Status bar */}
        <div
          style={{
            height: 22,
            background: '#007ACC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 12px',
            fontSize: 12,
            color: 'white'
          }}
        >
          <div style={{display: 'flex', gap: 20}}>
            <span>Ln 21, Col 4</span>
            <span>Spaces: 2</span>
            <span>UTF-8</span>
          </div>
          <div style={{display: 'flex', gap: 20}}>
            <span>TypeScript React</span>
            <span>Prettier</span>
          </div>
        </div>
      </div>

      {/* AI Assistant Panel */}
      <div
        style={{
          width: 400,
          background: '#252526',
          borderLeft: '1px solid #3e3e42',
          display: 'flex',
          flexDirection: 'column',
          opacity: interpolate(progress, [0.05, 0.15], [0, 1])
        }}
      >
        {/* Panel header */}
        <div
          style={{
            height: 35,
            background: '#2d2d30',
            borderBottom: '1px solid #3e3e42',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 12px'
          }}
        >
          <span style={{fontSize: 13, color: '#CCCCCC', display: 'flex', alignItems: 'center', gap: 8}}>
            <span style={{color: '#00D4FF'}}>◆</span> Claude
          </span>
          <div style={{display: 'flex', gap: 12, fontSize: 16, color: '#CCCCCC'}}>
            <span style={{cursor: 'pointer'}}>−</span>
            <span style={{cursor: 'pointer'}}>□</span>
            <span style={{cursor: 'pointer'}}>×</span>
          </div>
        </div>

        {/* AI content */}
        <div style={{flex: 1, padding: 16, overflowY: 'auto'}}>
          {/* User prompt */}
          <div
            style={{
              opacity: interpolate(progress, [PROMPT_START, PROMPT_START + 0.05], [0, 1]),
              transform: `translateY(${interpolate(progress, [PROMPT_START, PROMPT_START + 0.05], [10, 0])}px)`,
              marginBottom: 16
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8}}>
              <div style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: '#444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                color: '#CCC'
              }}>
                U
              </div>
              <span style={{fontSize: 12, color: '#888'}}>You</span>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 8,
              padding: 12,
              fontSize: 14,
              color: '#CCCCCC'
            }}>
              {promptText}
            </div>
          </div>

          {/* AI response with Accept button */}
          <div
            style={{
              opacity: interpolate(progress, [ACCEPT_START, ACCEPT_START + 0.05], [0, 1]),
              transform: `translateY(${interpolate(progress, [ACCEPT_START, ACCEPT_START + 0.05], [10, 0])}px)`
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8}}>
              <div style={{
                width: 24,
                height: 24,
                borderRadius: 4,
                background: 'linear-gradient(135deg, #00D4FF 0%, #0080FF 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                color: 'white',
                fontWeight: 'bold'
              }}>
                AI
              </div>
              <span style={{fontSize: 12, color: '#888'}}>Claude</span>
            </div>
            
            <div
              style={{
                background: 'rgba(0, 212, 255, 0.1)',
                border: '1px solid rgba(0, 212, 255, 0.3)',
                borderRadius: 8,
                padding: 12,
                marginBottom: 12,
                fontSize: 13,
                color: '#CCCCCC',
                lineHeight: 1.6
              }}
            >
              I'll help you build an app! Let me create a modern web application with React and TypeScript...
            </div>

            {/* Accept button */}
            <div
              style={{
                display: 'flex',
                gap: 8,
                marginBottom: 16,
                opacity: interpolate(progress, [ACCEPT_START + 0.05, ACCEPT_START + 0.1], [0, 1])
              }}
            >
              <button
                style={{
                  background: interpolate(progress, [CODE_STREAM_START - 0.05, CODE_STREAM_START], [0, 1]) > 0.5 ? '#0F5323' : '#007ACC',
                  color: 'white',
                  border: 'none',
                  borderRadius: 4,
                  padding: '8px 20px',
                  fontSize: 13,
                  cursor: 'pointer',
                  fontWeight: 500,
                  transform: `scale(${interpolate(progress, [CODE_STREAM_START - 0.05, CODE_STREAM_START], [1, 0.95])})`,
                  transition: 'all 0.2s'
                }}
              >
                {interpolate(progress, [CODE_STREAM_START - 0.05, CODE_STREAM_START], [0, 1]) > 0.5 ? '✓ Accepted' : 'Accept'}
              </button>
              <button
                style={{
                  background: 'transparent',
                  color: '#CCCCCC',
                  border: '1px solid #3e3e42',
                  borderRadius: 4,
                  padding: '8px 20px',
                  fontSize: 13,
                  cursor: 'pointer',
                  opacity: interpolate(progress, [CODE_STREAM_START, CODE_STREAM_START + 0.05], [1, 0.3])
                }}
              >
                Reject
              </button>
            </div>
          </div>

          {/* Code diff preview */}
          <div
            style={{
              opacity: interpolate(progress, [CODE_STREAM_START, CODE_STREAM_START + 0.1], [0, 1]),
              transform: `translateY(${interpolate(progress, [CODE_STREAM_START, CODE_STREAM_START + 0.1], [20, 0])}px)`
            }}
          >
            <div style={{fontSize: 14, color: '#888', marginBottom: 12, fontWeight: 500}}>
              Changes to apply:
            </div>
            <div style={{
              background: '#1e1e1e',
              border: '1px solid #3e3e42',
              borderRadius: 6,
              padding: 16,
              fontSize: 14,
              fontFamily: 'monospace',
              maxHeight: 300,
              overflowY: 'auto',
              lineHeight: 1.6
            }}>
              <div style={{color: '#CE9178', marginBottom: 4}}>+ export const ModernDeveloper...</div>
              <div style={{color: '#CE9178', marginBottom: 4}}>+ const frame = useCurrentFrame();</div>
              <div style={{color: '#CE9178', marginBottom: 4}}>+ // Scene fade in</div>
              <div style={{color: '#CE9178', marginBottom: 4}}>+ const fadeIn = interpolate...</div>
              <div style={{color: '#6A9955', marginTop: 8}}>// More changes below...</div>
            </div>
          </div>
        </div>
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