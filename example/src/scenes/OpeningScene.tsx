import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig, Img, staticFile} from 'remotion';
import {Logo} from '../components/Logo';
import {Title, Body} from '../components/Typography';
import { colors, spacing, typography, borderRadius, shadows, buttonStyles } from '../styles/design-tokens';

export const OpeningScene: React.FC = () => {
    const frame = useCurrentFrame();
    const {fps} = useVideoConfig();
    
    // Logo animation with bounce effect
    const logoScale = spring({
        fps,
        frame,
        config: {
            damping: 100,
            stiffness: 200,
            mass: 0.5
        }
    });
    
    // Title fade in
    const titleOpacity = interpolate(
        frame,
        [15, 25],
        [0, 1],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
        }
    );
    
    const titleTranslateY = interpolate(
        frame,
        [15, 25],
        [20, 0],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
        }
    );
    
    // Subtitle fade in
    const subtitleOpacity = interpolate(
        frame,
        [25, 35],
        [0, 1],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
        }
    );
    
    // MCP badge animation with spring
    const mcpBadgeSpring = spring({
        fps,
        frame: frame - 40,
        config: {
            damping: 150,
            stiffness: 300
        }
    });
    
    const mcpBadgeRotate = interpolate(
        frame,
        [40, 55],
        [-10, 0],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
        }
    );
    
    return (
        <AbsoluteFill
            style={{
                backgroundColor: colors.background.primary,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: spacing[16]
            }}
        >
            <div
                style={{
                    transform: `scale(${logoScale * 1.2})`,
                    marginBottom: spacing[10]
                }}
            >
                <Logo size="lg" />
            </div>
            
            <div
                style={{
                    opacity: titleOpacity,
                    transform: `translateY(${titleTranslateY}px)`,
                    marginBottom: spacing[5],
                    textAlign: 'center'
                }}
            >
                <Title style={{
                    letterSpacing: typography.letterSpacing.tighter,
                    fontWeight: typography.weights.bold
                }}>
                    Link Shortening with Agents
                </Title>
            </div>
            
            <div
                style={{
                    opacity: subtitleOpacity,
                    marginBottom: spacing[10],
                    textAlign: 'center',
                    maxWidth: '600px'
                }}
            >
                <Body style={{
                    fontSize: typography.sizes.xl,
                    color: colors.text.secondary,
                    lineHeight: typography.lineHeights.relaxed
                }}>
                    Blazing fast, API-first link shortening for developers.
                </Body>
            </div>
            
            <div
                style={{
                    transform: `scale(${mcpBadgeSpring}) rotate(${mcpBadgeRotate}deg)`,
                    transformOrigin: 'center',
                    background: buttonStyles.gradient.background,
                    color: buttonStyles.gradient.color,
                    padding: `${spacing[3]} ${spacing[6]}`,
                    borderRadius: borderRadius.full,
                    fontFamily: typography.fonts.mono,
                    fontSize: typography.sizes.base,
                    fontWeight: typography.weights.semibold,
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing[2],
                    boxShadow: '0 4px 20px rgba(124, 58, 237, 0.3)'
                }}
            >
                <Img
                    src={staticFile('mcp.png')}
                    style={{
                        width: '24px',
                        height: '24px',
                        objectFit: 'contain'
                    }}
                />
                MCP Ready
            </div>
        </AbsoluteFill>
    );
};