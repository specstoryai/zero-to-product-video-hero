import React from 'react';
import {interpolate, useCurrentFrame, spring, useVideoConfig} from 'remotion';
import { colors, typography, spacing, borderRadius, buttonStyles, shadows, animations } from '../styles/design-tokens';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'gradient' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    animated?: boolean;
    animationDelay?: number;
    onClick?: () => void;
    style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
    children, 
    variant = 'primary',
    size = 'md',
    animated = false,
    animationDelay = 0,
    onClick,
    style
}) => {
    const frame = useCurrentFrame();
    const {fps} = useVideoConfig();
    
    // Use spring animation for smoother entrance
    const scale = animated ? spring({
        frame: frame - animationDelay,
        fps,
        config: {
            damping: 200,
            stiffness: 300
        }
    }) : 1;
    
    const opacity = animated ? interpolate(
        frame - animationDelay,
        [0, 10],
        [0, 1],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
        }
    ) : 1;
    
    const sizeStyles = {
        sm: {
            padding: `${spacing[2]} ${spacing[4]}`,
            fontSize: typography.sizes.sm,
            borderRadius: borderRadius.md
        },
        md: {
            padding: `${spacing[3]} ${spacing[6]}`,
            fontSize: typography.sizes.base,
            borderRadius: borderRadius.lg
        },
        lg: {
            padding: `${spacing[4]} ${spacing[8]}`,
            fontSize: typography.sizes.lg,
            borderRadius: borderRadius.lg
        }
    };
    
    const variantStyles = {
        primary: {
            backgroundColor: buttonStyles.primary.background,
            color: buttonStyles.primary.color,
            border: 'none',
            boxShadow: shadows.md
        },
        secondary: {
            backgroundColor: buttonStyles.secondary.background,
            color: buttonStyles.secondary.color,
            border: `1px solid ${colors.border.light}`,
            boxShadow: 'none'
        },
        gradient: {
            background: buttonStyles.gradient.background,
            color: buttonStyles.gradient.color,
            border: 'none',
            boxShadow: shadows.lg
        },
        ghost: {
            backgroundColor: buttonStyles.ghost.background,
            color: buttonStyles.ghost.color,
            border: 'none',
            boxShadow: 'none'
        }
    };
    
    return (
        <button
            onClick={onClick}
            style={{
                fontFamily: typography.fonts.sans,
                fontWeight: typography.weights.semibold,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: spacing[2],
                textAlign: 'center',
                transition: `all ${animations.duration.normal} ${animations.easing.default}`,
                transform: `scale(${scale})`,
                opacity,
                outline: 'none',
                letterSpacing: '-0.01em',
                ...sizeStyles[size],
                ...variantStyles[variant],
                ...style
            }}
        >
            {children}
        </button>
    );
};