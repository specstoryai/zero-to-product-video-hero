import React from 'react';
import {interpolate, useCurrentFrame, spring, useVideoConfig} from 'remotion';
import { colors, spacing, borderRadius, shadows, animations } from '../styles/design-tokens';

interface CardProps {
    children: React.ReactNode;
    variant?: 'default' | 'elevated' | 'feature' | 'alert' | 'premium';
    size?: 'sm' | 'md' | 'lg';
    animated?: boolean;
    animationDelay?: number;
    hover?: boolean;
    alertType?: 'error' | 'success' | 'warning' | 'info';
    gradient?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
    children,
    variant = 'default',
    size = 'md',
    animated = false,
    animationDelay = 0,
    hover = false,
    alertType,
    gradient = false,
    className = '',
    style
}) => {
    const frame = useCurrentFrame();
    const {fps} = useVideoConfig();
    
    // Use spring for smoother animation
    const scale = animated ? spring({
        frame: frame - animationDelay,
        fps,
        config: {
            damping: 200,
            stiffness: 300
        }
    }) : 1;
    
    const translateY = animated ? interpolate(
        frame - animationDelay,
        [0, 15],
        [20, 0],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
        }
    ) : 0;
    
    const opacity = animated ? interpolate(
        frame - animationDelay,
        [0, 15],
        [0, 1],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
        }
    ) : 1;
    
    // Size-based styles
    const sizeStyles = {
        sm: {
            padding: spacing[4], // 16px
            borderRadius: borderRadius.lg
        },
        md: {
            padding: spacing[6], // 24px
            borderRadius: borderRadius.xl
        },
        lg: {
            padding: spacing[8], // 32px
            borderRadius: borderRadius['2xl']
        }
    };
    
    // Variant-based styles
    const variantStyles = {
        default: {
            backgroundColor: colors.background.primary,
            border: `1px solid ${colors.border.light}`,
            boxShadow: shadows.sm
        },
        elevated: {
            backgroundColor: colors.background.primary,
            border: `1px solid ${colors.border.default}`,
            boxShadow: shadows.lg
        },
        feature: {
            backgroundColor: colors.background.secondary,
            border: `1px solid ${colors.border.light}`,
            boxShadow: shadows.md
        },
        alert: {
            backgroundColor: alertType === 'error' ? '#FEF2F2' :
                           alertType === 'success' ? '#F0FDF4' :
                           alertType === 'warning' ? '#FFFBEB' :
                           '#EFF6FF',
            border: `1px solid ${
                alertType === 'error' ? '#FECACA' :
                alertType === 'success' ? '#BBF7D0' :
                alertType === 'warning' ? '#FDE68A' :
                '#BFDBFE'
            }`,
            boxShadow: shadows.sm
        },
        premium: {
            backgroundColor: colors.background.primary,
            border: `2px solid ${colors.brand.purple}`,
            boxShadow: shadows.xl,
            transform: `scale(${scale * 1.05}) translateY(${translateY}px)`
        }
    };
    
    // Gradient overlay for feature cards
    const gradientOverlay = gradient ? {
        background: `linear-gradient(135deg, rgba(124, 58, 237, 0.05) 0%, rgba(124, 58, 237, 0.1) 100%)`
    } : {};
    
    const baseStyles = {
        ...sizeStyles[size],
        ...variantStyles[variant],
        transform: variant !== 'premium' ? `scale(${scale}) translateY(${translateY}px)` : variantStyles.premium.transform,
        opacity,
        transition: hover ? `all ${animations.duration.normal} ${animations.easing.default}` : undefined,
        ...gradientOverlay
    };
    
    return (
        <div
            className={className}
            style={{
                ...baseStyles,
                ...style
            }}
        >
            {children}
        </div>
    );
};