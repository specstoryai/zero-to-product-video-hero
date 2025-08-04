import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, Sequence, spring, useVideoConfig, Img, staticFile} from 'remotion';
import {Heading, Body, Code} from '../components/Typography';
import {Card} from '../components/Card';
import {LinkIcon, CheckIcon} from '../components/Icons';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/design-tokens';

interface MessageProps {
    type: 'user' | 'claude';
    content: React.ReactNode;
    typingDuration?: number;
    startFrame: number;
}

const Message: React.FC<MessageProps> = ({type, content, typingDuration = 0, startFrame}) => {
    const frame = useCurrentFrame();
    const {fps} = useVideoConfig();
    
    // Only animate if we've reached this message's start time
    const relativeFrame = frame - startFrame;
    const isVisible = frame >= startFrame;
    
    if (!isVisible) return null;
    
    // Message container animation
    const messageScale = spring({
        fps,
        frame: Math.max(0, relativeFrame),
        config: {
            damping: 200,
            stiffness: 300
        }
    });
    
    const opacity = interpolate(
        relativeFrame,
        [0, 5],
        [0, 1],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
        }
    );
    
    // Typing indicator for Claude messages
    const showTyping = type === 'claude' && typingDuration > 0;
    const typingOpacity = showTyping ? interpolate(
        relativeFrame,
        [0, typingDuration],
        [1, 0],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
        }
    ) : 0;
    
    const contentOpacity = showTyping ? interpolate(
        relativeFrame,
        [typingDuration, typingDuration + 5],
        [0, 1],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
        }
    ) : 1;
    
    return (
        <div
            style={{
                opacity,
                transform: `scale(${messageScale})`,
                transformOrigin: type === 'user' ? 'right center' : 'left center',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
                width: '100%',
                marginBottom: '20px'
            }}
        >
            <div
                style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: type === 'user' ? colors.background.tertiary : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: typography.sizes.xl,
                    flexShrink: 0,
                    overflow: 'hidden'
                }}
            >
                {type === 'user' ? (
                    <Img
                        src={staticFile('person.png')}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                ) : (
                    <Img
                        src={staticFile('claude.png')}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                )}
            </div>
            <div
                style={{
                    flex: 1,
                    backgroundColor: type === 'user' ? '#F9FAFB' : '#FFFFFF',
                    border: type === 'user' ? '2px solid #E5E7EB' : `2px solid ${colors.brand.purple}`,
                    borderRadius: '12px',
                    padding: '16px 20px',
                    fontFamily: 'Geist Sans, sans-serif',
                    fontSize: '16px',
                    lineHeight: 1.6,
                    position: 'relative',
                    minHeight: '60px',
                    boxShadow: type === 'user' ? '0 1px 3px rgba(0, 0, 0, 0.1)' : '0 2px 4px rgba(124, 58, 237, 0.2)'
                }}
            >
                {showTyping && (
                    <div
                        style={{
                            position: 'absolute',
                            opacity: typingOpacity,
                            display: 'flex',
                            gap: '4px',
                            alignItems: 'center'
                        }}
                    >
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    backgroundColor: '#6B7280',
                                    animation: `pulse 1.5s infinite`,
                                    animationDelay: `${i * 0.15}s`
                                }}
                            />
                        ))}
                    </div>
                )}
                <div style={{opacity: showTyping ? contentOpacity : 1}}>
                    {content}
                </div>
            </div>
        </div>
    );
};

export const ClaudeDemo: React.FC = () => {
    const frame = useCurrentFrame();
    
    // Timeline for messages - compressed for 240 frames total
    const message1Start = 15;
    const message2Start = message1Start + 15;
    const message3Start = message2Start + 25;
    const message4Start = message3Start + 15;
    const message5Start = message4Start + 25;
    const message6Start = message5Start + 15;
    const message7Start = message6Start + 25;
    const message8Start = message7Start + 15;
    
    // Smooth scroll animation based on current frame
    const scrollY = (() => {
        if (frame < message1Start) return 0;
        if (frame < message3Start) return 0;
        if (frame < message4Start) {
            return interpolate(
                frame,
                [message3Start - 5, message3Start + 5],
                [0, -100],
                {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp'
                }
            );
        }
        if (frame < message5Start) {
            return interpolate(
                frame,
                [message4Start + 15, message4Start + 20],
                [-100, -200],
                {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp'
                }
            );
        }
        if (frame < message6Start) {
            return interpolate(
                frame,
                [message5Start - 5, message5Start + 5],
                [-200, -300],
                {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp'
                }
            );
        }
        if (frame < message7Start) {
            return interpolate(
                frame,
                [message6Start + 15, message6Start + 20],
                [-300, -450],
                {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp'
                }
            );
        }
        if (frame < message8Start) {
            return interpolate(
                frame,
                [message7Start - 5, message7Start + 5],
                [-450, -550],
                {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp'
                }
            );
        }
        return interpolate(
            frame,
            [message8Start + 15, message8Start + 20],
            [-550, -650],
            {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp'
            }
        );
    })();
    
    const messages = [
        {
            type: 'user' as const,
            startFrame: message1Start,
            content: "Shorten this URL for my landing page: https://my-awesome-startup.com/blog/announcing-series-a-funding-round-2024"
        },
        {
            type: 'claude' as const,
            startFrame: message2Start,
            typingDuration: 15,
            content: (
                <div>
                    <div style={{marginBottom: '12px'}}>
                        I'll shorten that URL for you using tny.dev.
                    </div>
                    <div
                        style={{
                            backgroundColor: colors.background.tertiary,
                            padding: spacing[3],
                            borderRadius: borderRadius.md,
                            fontFamily: typography.fonts.mono,
                            fontSize: typography.sizes.sm,
                            marginBottom: spacing[3]
                        }}
                    >
                        <div style={{opacity: 0.6, marginBottom: spacing[1]}}>Shortened URL:</div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                            <LinkIcon size={16} />
                            <strong>tny.dev/xK9mP2</strong>
                        </div>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981'}}>
                        <CheckIcon size={16} color="#10B981" />
                        <span style={{fontSize: '14px'}}>Link created successfully!</span>
                    </div>
                </div>
            )
        },
        {
            type: 'user' as const,
            startFrame: message3Start,
            content: "Can you create a custom link using 'extension' as the slug and get.specstory.com as the custom domain?"
        },
        {
            type: 'claude' as const,
            startFrame: message4Start,
            typingDuration: 15,
            content: (
                <div>
                    <div style={{marginBottom: '12px'}}>
                        I'll create a custom short link with the slug "extension" on your custom domain.
                    </div>
                    <div
                        style={{
                            backgroundColor: colors.background.tertiary,
                            padding: spacing[3],
                            borderRadius: borderRadius.md,
                            fontFamily: typography.fonts.mono,
                            fontSize: typography.sizes.sm,
                            marginBottom: spacing[3]
                        }}
                    >
                        <div style={{opacity: 0.6, marginBottom: spacing[1]}}>Custom URL:</div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                            <LinkIcon size={16} />
                            <strong>get.specstory.com/extension</strong>
                        </div>
                    </div>
                    <div style={{fontSize: '14px', color: '#6B7280'}}>
                        ✨ Your custom link is ready to share!
                    </div>
                </div>
            )
        },
        {
            type: 'user' as const,
            startFrame: message5Start,
            content: "How many clicks did it get?"
        },
        {
            type: 'claude' as const,
            startFrame: message6Start,
            typingDuration: 15,
            content: (
                <div>
                    <div style={{marginBottom: '12px'}}>
                        Here are the analytics for get.specstory.com/extension:
                    </div>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '12px',
                            marginBottom: '12px'
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: '#F3F4F6',
                                padding: '12px',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}
                        >
                            <div style={{fontSize: '24px', fontWeight: 'bold'}}>247</div>
                            <div style={{fontSize: '12px', color: '#6B7280'}}>Total Clicks</div>
                        </div>
                        <div
                            style={{
                                backgroundColor: '#F3F4F6',
                                padding: '12px',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}
                        >
                            <div style={{fontSize: '24px', fontWeight: 'bold'}}>89%</div>
                            <div style={{fontSize: '12px', color: '#6B7280'}}>Human Traffic</div>
                        </div>
                        <div
                            style={{
                                backgroundColor: '#F3F4F6',
                                padding: '12px',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}
                        >
                            <div style={{fontSize: '24px', fontWeight: 'bold'}}>12</div>
                            <div style={{fontSize: '12px', color: '#6B7280'}}>Countries</div>
                        </div>
                    </div>
                    <div style={{fontSize: '14px', color: '#6B7280'}}>
                        📊 Peak traffic was yesterday at 2:30 PM EST
                    </div>
                </div>
            )
        },
        {
            type: 'user' as const,
            startFrame: message7Start,
            content: "Can you show me all my links?"
        },
        {
            type: 'claude' as const,
            startFrame: message8Start,
            typingDuration: 15,
            content: (
                <div>
                    <div style={{marginBottom: '12px'}}>
                        Here are all your active links:
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                        <div
                            style={{
                                backgroundColor: '#F3F4F6',
                                padding: '12px',
                                borderRadius: '8px',
                                fontSize: '14px'
                            }}
                        >
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <div>
                                    <strong style={{fontFamily: typography.fonts.mono}}>get.specstory.com/extension</strong>
                                    <div style={{fontSize: typography.sizes.xs, color: colors.text.secondary, marginTop: '2px'}}>
                                        247 clicks • Created today
                                    </div>
                                </div>
                                <span style={{fontSize: '12px', color: '#10B981'}}>Active</span>
                            </div>
                        </div>
                        <div
                            style={{
                                backgroundColor: '#F3F4F6',
                                padding: '12px',
                                borderRadius: '8px',
                                fontSize: '14px'
                            }}
                        >
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <div>
                                    <strong style={{fontFamily: 'Geist Mono, monospace'}}>tny.dev/xK9mP2</strong>
                                    <div style={{fontSize: '12px', color: '#6B7280', marginTop: '2px'}}>
                                        0 clicks • Created 1 min ago
                                    </div>
                                </div>
                                <span style={{fontSize: '12px', color: '#10B981'}}>Active</span>
                            </div>
                        </div>
                        <div
                            style={{
                                backgroundColor: '#F3F4F6',
                                padding: '12px',
                                borderRadius: '8px',
                                fontSize: '14px'
                            }}
                        >
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <div>
                                    <strong style={{fontFamily: 'Geist Mono, monospace'}}>tny.dev/demo-2024</strong>
                                    <div style={{fontSize: '12px', color: '#6B7280', marginTop: '2px'}}>
                                        1,842 clicks • Created last week
                                    </div>
                                </div>
                                <span style={{fontSize: '12px', color: '#10B981'}}>Active</span>
                            </div>
                        </div>
                    </div>
                    <div style={{fontSize: '14px', color: '#6B7280', marginTop: '12px'}}>
                        📋 Total: 3 active links • 2,089 total clicks
                    </div>
                </div>
            )
        }
    ];
    
    return (
        <AbsoluteFill
            style={{
                backgroundColor: colors.background.primary,
            }}
        >
            <style>{`
                @keyframes pulse {
                    0%, 60%, 100% {
                        opacity: 0.3;
                        transform: scale(0.8);
                    }
                    30% {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    padding: spacing[10],
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                }}
            >
                {/* Header */}
                <div
                    style={{
                        textAlign: 'center',
                        marginBottom: spacing[3],
                        opacity: interpolate(frame, [0, 15], [0, 1], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp'
                        })
                    }}
                >
                    <p style={{
                        fontSize: typography.sizes.sm,
                        fontWeight: typography.weights.semibold,
                        textTransform: 'uppercase',
                        letterSpacing: typography.letterSpacing.widest,
                        color: colors.text.secondary,
                        marginBottom: spacing[2],
                        fontFamily: typography.fonts.sans
                    }}>
                        MCP Demo
                    </p>
                    <Heading style={{
                        fontSize: typography.sizes['4xl'],
                        fontWeight: typography.weights.bold,
                        letterSpacing: typography.letterSpacing.tighter,
                        marginBottom: spacing[3]
                    }}>
                        Natural Language Shortening
                    </Heading>
                    <Body style={{
                        fontSize: typography.sizes.lg,
                        color: colors.text.secondary,
                        lineHeight: typography.lineHeights.relaxed
                    }}>
                        Watch how Claude handles your links with tny.dev MCP
                    </Body>
                    <Body style={{
                        marginTop: spacing[2], 
                        color: colors.text.secondary, 
                        fontSize: typography.sizes.sm,
                        opacity: interpolate(frame - (message8Start + 30), [0, 20], [0, 1], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp'
                        })
                    }}>
                        No tab switching. No copying. Just conversation.
                    </Body>
                </div>
                
                {/* Chat container */}
                <div
                    style={{
                        maxWidth: '900px',
                        width: '100%',
                        background: `linear-gradient(to bottom, ${colors.brand.purple}10 0%, ${colors.brand.purple}05 100%)`,
                        borderRadius: borderRadius['2xl'],
                        border: `1px solid ${colors.border.light}`,
                        height: '700px',
                        overflow: 'hidden',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: spacing[6]
                    }}
                >
                    {/* Scrollable content */}
                    <div
                        style={{
                            padding: '32px',
                            transform: `translateY(${scrollY}px)`
                        }}
                    >
                        {/* All messages in one container */}
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            {messages.map((msg, index) => (
                                <Message
                                    key={index}
                                    type={msg.type}
                                    content={msg.content}
                                    typingDuration={msg.typingDuration}
                                    startFrame={msg.startFrame}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};