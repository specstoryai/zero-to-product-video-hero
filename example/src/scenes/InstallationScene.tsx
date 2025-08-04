import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, Sequence, spring, useVideoConfig, Img, staticFile} from 'remotion';
import {Heading, Body, Code} from '../components/Typography';
import {Card} from '../components/Card';
import {CheckIcon} from '../components/Icons';
import {Button} from '../components/Button';
import { colors, spacing, typography, borderRadius } from '../styles/design-tokens';

export const InstallationScene: React.FC = () => {
    const frame = useCurrentFrame();
    const {fps} = useVideoConfig();
    
    // Scene title animation
    const titleOpacity = interpolate(
        frame,
        [0, 10],
        [0, 1],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
        }
    );
    
    // Options slide in with spring animation
    const option1Spring = spring({
        fps,
        frame: frame - 15,
        config: {
            damping: 150,
            stiffness: 200
        }
    });
    
    const option2Spring = spring({
        fps,
        frame: frame - 20,
        config: {
            damping: 150,
            stiffness: 200
        }
    });
    
    const option3Spring = spring({
        fps,
        frame: frame - 25,
        config: {
            damping: 150,
            stiffness: 200
        }
    });
    
    return (
        <AbsoluteFill
            style={{
                backgroundColor: colors.background.secondary,
                padding: spacing[16],
                display: 'flex',
                flexDirection: 'column',
                gap: spacing[10],
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <div
                style={{
                    opacity: titleOpacity,
                    textAlign: 'center',
                    marginBottom: spacing[5]
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
                    Installation
                </p>
                <Heading style={{
                    fontSize: typography.sizes['4xl'],
                    fontWeight: typography.weights.bold,
                    letterSpacing: typography.letterSpacing.tighter,
                    marginBottom: spacing[4]
                }}>
                    Three Ways to Get Started
                </Heading>
                <Body style={{
                    fontSize: typography.sizes.lg,
                    color: colors.text.secondary,
                    lineHeight: typography.lineHeights.relaxed
                }}>
                    Choose the installation method that works best for you
                </Body>
            </div>
            
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: spacing[6],
                    maxWidth: '700px',
                    margin: '0 auto',
                    width: '100%'
                }}
            >
                {/* Option 1: Desktop Extension */}
                <div
                    style={{
                        transform: `translateX(${(1 - option1Spring) * -100}px) scale(${option1Spring})`,
                        opacity: option1Spring
                    }}
                >
                    <Card variant="elevated" animated={false}>
                        <div style={{display: 'flex', alignItems: 'center', gap: spacing[5]}}>
                            <div
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: borderRadius.lg,
                                    overflow: 'hidden',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Img
                                    src={staticFile('claude.png')}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>
                            <div style={{flex: 1}}>
                                <h3 style={{
                                    fontFamily: typography.fonts.sans,
                                    fontSize: typography.sizes['2xl'],
                                    fontWeight: typography.weights.semibold,
                                    marginBottom: spacing[1],
                                    color: colors.text.primary
                                }}>
                                    Claude Desktop Extension
                                </h3>
                                <Body style={{fontSize: typography.sizes.lg, margin: 0}}>
                                    One-click install from tny.dev/mcp
                                </Body>
                            </div>
                            <Sequence from={35}>
                                <CheckIcon animated animationDelay={0} size={36} color={colors.semantic.success} />
                            </Sequence>
                        </div>
                    </Card>
                </div>
                
                {/* Option 2: NPM */}
                <div
                    style={{
                        transform: `translateX(${(1 - option2Spring) * 100}px) scale(${option2Spring})`,
                        opacity: option2Spring
                    }}
                >
                    <Card variant="elevated" animated={false}>
                        <div style={{display: 'flex', alignItems: 'center', gap: spacing[5]}}>
                            <div
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: borderRadius.lg,
                                    background: 'linear-gradient(135deg, #C53030 0%, #EF4444 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: typography.sizes['2xl']
                                }}
                            >
                                📦
                            </div>
                            <div style={{flex: 1}}>
                                <h3 style={{
                                    fontFamily: typography.fonts.sans,
                                    fontSize: typography.sizes['2xl'],
                                    fontWeight: typography.weights.semibold,
                                    marginBottom: spacing[2],
                                    color: colors.text.primary
                                }}>
                                    NPM Package
                                </h3>
                                <Code style={{fontSize: typography.sizes.lg}}>npx -y @specstory/tnydev-mcp</Code>
                            </div>
                            <Sequence from={40}>
                                <CheckIcon animated animationDelay={0} size={36} color={colors.semantic.success} />
                            </Sequence>
                        </div>
                    </Card>
                </div>
                
                {/* Option 3: GitHub */}
                <div
                    style={{
                        transform: `translateX(${(1 - option3Spring) * -100}px) scale(${option3Spring})`,
                        opacity: option3Spring
                    }}
                >
                    <Card variant="elevated" animated={false}>
                        <div style={{display: 'flex', alignItems: 'center', gap: spacing[5]}}>
                            <div
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: borderRadius.lg,
                                    background: colors.brand.black,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: typography.sizes['2xl']
                                }}
                            >
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </div>
                            <div style={{flex: 1}}>
                                <h3 style={{
                                    fontFamily: typography.fonts.sans,
                                    fontSize: typography.sizes['2xl'],
                                    fontWeight: typography.weights.semibold,
                                    marginBottom: spacing[2],
                                    color: colors.text.primary
                                }}>
                                    Build from Source
                                </h3>
                                <Code style={{fontSize: typography.sizes.lg}}>git clone github.com/specstoryai/tnydev-mcp</Code>
                            </div>
                            <Sequence from={45}>
                                <CheckIcon animated animationDelay={0} size={36} color={colors.semantic.success} />
                            </Sequence>
                        </div>
                    </Card>
                </div>
            </div>
            
            {/* Bottom CTA */}
            <Sequence from={55}>
                <div
                    style={{
                        textAlign: 'center',
                        marginTop: spacing[10],
                        opacity: interpolate(frame - 55, [0, 20], [0, 1], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp'
                        })
                    }}
                >
                    <Button variant="gradient" size="lg" animated animationDelay={60}>
                        Get Started in Under 60 Seconds
                    </Button>
                </div>
            </Sequence>
        </AbsoluteFill>
    );
};