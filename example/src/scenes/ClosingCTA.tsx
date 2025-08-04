import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig} from 'remotion';
import {Logo} from '../components/Logo';
import {Title, Body} from '../components/Typography';
import {Button} from '../components/Button';
import {CheckIcon, ArrowRightIcon} from '../components/Icons';
import { colors, spacing, typography, borderRadius, shadows, buttonStyles } from '../styles/design-tokens';

export const ClosingCTA: React.FC = () => {
    const frame = useCurrentFrame();
    const {fps} = useVideoConfig();
    
    // Main container scale - starts from center and expands
    const containerScale = spring({
        fps,
        frame: frame - 5,
        config: {
            damping: 200,
            stiffness: 100
        }
    });
    
    // Logo animation
    const logoOpacity = interpolate(
        frame,
        [10, 20],
        [0, 1],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
        }
    );
    
    const logoScale = spring({
        fps,
        frame: frame - 10,
        config: {
            damping: 200
        }
    });
    
    // Title animation
    const titleOpacity = interpolate(
        frame,
        [20, 30],
        [0, 1],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
        }
    );
    
    const titleY = interpolate(
        frame,
        [20, 30],
        [30, 0],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
        }
    );
    
    // Subtitle animation
    const subtitleOpacity = interpolate(
        frame,
        [30, 40],
        [0, 1],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
        }
    );
    
    const subtitleY = interpolate(
        frame,
        [30, 40],
        [20, 0],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
        }
    );
    
    // Price animation - pops in with bounce
    const priceOpacity = frame >= 45 ? 1 : 0;
    const priceScale = spring({
        fps,
        frame: frame - 45,
        config: {
            damping: 100,
            stiffness: 200
        }
    });
    
    const features = [
        '500 API calls/hour',
        'Custom domains & slugs',
        'Real-time analytics',
        'Webhook notifications',
        'No hidden fees'
    ];
    
    return (
        <AbsoluteFill
            style={{
                backgroundColor: colors.background.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: spacing[10]
            }}
        >
            {/* Black container for all content */}
            <div
                style={{
                    backgroundColor: colors.brand.black,
                    borderRadius: borderRadius['2xl'],
                    padding: spacing[16],
                    maxWidth: '800px',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: `scale(${containerScale})`,
                    boxShadow: shadows['2xl'],
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Logo with smooth scale animation */}
                <div
                    style={{
                        marginBottom: spacing[10],
                        transform: `scale(${logoScale})`,
                        opacity: logoOpacity,
                        backgroundColor: colors.background.primary,
                        padding: spacing[3],
                        borderRadius: borderRadius.lg
                    }}
                >
                    <Logo size="lg" />
                </div>
                
                {/* Main headline with fade and slide */}
                <div
                    style={{
                        marginBottom: spacing[5],
                        textAlign: 'center',
                        opacity: titleOpacity,
                        transform: `translateY(${titleY}px)`
                    }}
                >
                    <p style={{
                        fontSize: typography.sizes.sm,
                        fontWeight: typography.weights.semibold,
                        textTransform: 'uppercase',
                        letterSpacing: typography.letterSpacing.widest,
                        color: colors.text.muted,
                        marginBottom: spacing[2],
                        fontFamily: typography.fonts.sans,
                        opacity: titleOpacity
                    }}>
                        Get Started
                    </p>
                    <Title style={{
                        color: colors.text.inverse,
                        fontSize: typography.sizes['5xl'],
                        fontWeight: typography.weights.bold,
                        letterSpacing: typography.letterSpacing.tighter
                    }}>
                        Start Building Today
                    </Title>
                </div>
                
                {/* Subheadline */}
                <div
                    style={{
                        marginBottom: '40px',
                        textAlign: 'center',
                        maxWidth: '600px',
                        opacity: subtitleOpacity,
                        transform: `translateY(${subtitleY}px)`
                    }}
                >
                    <Body style={{
                        color: colors.text.muted,
                        fontSize: typography.sizes.xl,
                        lineHeight: typography.lineHeights.relaxed
                    }}>
                        Join thousands of developers building with tny.dev.
                    </Body>
                </div>
                
                {/* Pricing with bounce animation */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '8px',
                        marginBottom: '30px',
                        transform: `scale(${priceScale})`,
                        opacity: priceOpacity
                    }}
                >
                    <span style={{
                        fontSize: '64px',
                        fontWeight: 'bold',
                        color: '#FFFFFF',
                        fontFamily: 'Geist Sans, sans-serif'
                    }}>
                        $9
                    </span>
                    <span style={{
                        fontSize: '24px',
                        color: '#E5E7EB',
                        fontFamily: 'Geist Sans, sans-serif'
                    }}>
                        /month
                    </span>
                    <span style={{
                        fontSize: '16px',
                        color: '#9CA3AF',
                        fontFamily: 'Geist Sans, sans-serif',
                        marginLeft: '8px',
                        opacity: interpolate(frame - 55, [0, 10], [0, 1], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp'
                        })
                    }}>
                        (or $90/year)
                    </span>
                </div>
                
                {/* Feature list with staggered animations */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        marginBottom: '40px',
                        alignItems: 'center',
                        opacity: interpolate(
                            frame,
                            [60, 70],
                            [0, 1],
                            {
                                extrapolateLeft: 'clamp',
                                extrapolateRight: 'clamp'
                            }
                        )
                    }}
                >
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        alignItems: 'flex-start'
                    }}>
                        {features.map((feature, i) => (
                            <div
                                key={i}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    opacity: interpolate(
                                        frame - (65 + i * 4),
                                        [0, 10],
                                        [0, 1],
                                        {
                                            extrapolateLeft: 'clamp',
                                            extrapolateRight: 'clamp'
                                        }
                                    ),
                                    transform: `scale(${interpolate(
                                        frame - (65 + i * 4),
                                        [0, 10],
                                        [0.8, 1],
                                        {
                                            extrapolateLeft: 'clamp',
                                            extrapolateRight: 'clamp'
                                        }
                                    )})`
                                }}
                            >
                                <CheckIcon size={20} color="#10B981" animated={false} />
                                <span style={{
                                    color: '#FFFFFF',
                                    fontSize: '18px',
                                    fontFamily: 'Geist Sans, sans-serif'
                                }}>
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* CTA Button with spring animation */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '20px',
                        opacity: frame >= 90 ? 1 : 0,
                        transform: `scale(${spring({
                            fps,
                            frame: frame - 90,
                            config: {
                                damping: 200
                            }
                        })})`
                    }}
                >
                    <div
                        style={{
                            backgroundColor: '#FFFFFF',
                            color: '#000000',
                            padding: '16px 32px',
                            borderRadius: '10px',
                            fontFamily: 'Geist Sans, sans-serif',
                            fontSize: '18px',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 20px rgba(255, 255, 255, 0.2)'
                        }}
                    >
                        Get Started Free: https://tny.dev
                        <ArrowRightIcon size={20} animated={true} animationDelay={110} />
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};