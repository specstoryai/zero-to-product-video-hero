import React from 'react';
import { typography, colors, spacing } from '../styles/design-tokens';

interface TypographyProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export const Title: React.FC<TypographyProps> = ({children, className = '', style}) => {
    return (
        <h1 
            className={className}
            style={{
                fontFamily: typography.fonts.sans,
                fontSize: typography.sizes['5xl'],
                fontWeight: typography.weights.bold,
                lineHeight: typography.lineHeights.tight,
                color: colors.text.primary,
                letterSpacing: '-0.025em',
                margin: 0,
                ...style
            }}
        >
            {children}
        </h1>
    );
};

export const Heading: React.FC<TypographyProps> = ({children, className = '', style}) => {
    return (
        <h2 
            className={className}
            style={{
                fontFamily: typography.fonts.sans,
                fontSize: typography.sizes['3xl'],
                fontWeight: typography.weights.semibold,
                lineHeight: typography.lineHeights.tight,
                color: colors.text.primary,
                letterSpacing: '-0.02em',
                margin: 0,
                ...style
            }}
        >
            {children}
        </h2>
    );
};

export const Subtitle: React.FC<TypographyProps> = ({children, className = '', style}) => {
    return (
        <h3
            className={className}
            style={{
                fontFamily: typography.fonts.sans,
                fontSize: typography.sizes.xl,
                fontWeight: typography.weights.medium,
                lineHeight: typography.lineHeights.snug,
                color: colors.text.secondary,
                margin: 0,
                ...style
            }}
        >
            {children}
        </h3>
    );
};

export const Body: React.FC<TypographyProps> = ({children, className = '', style}) => {
    return (
        <p 
            className={className}
            style={{
                fontFamily: typography.fonts.sans,
                fontSize: typography.sizes.lg,
                fontWeight: typography.weights.normal,
                lineHeight: typography.lineHeights.normal,
                color: colors.text.secondary,
                margin: 0,
                ...style
            }}
        >
            {children}
        </p>
    );
};

export const Caption: React.FC<TypographyProps> = ({children, className = '', style}) => {
    return (
        <span
            className={className}
            style={{
                fontFamily: typography.fonts.sans,
                fontSize: typography.sizes.sm,
                fontWeight: typography.weights.normal,
                lineHeight: typography.lineHeights.normal,
                color: colors.text.tertiary,
                margin: 0,
                ...style
            }}
        >
            {children}
        </span>
    );
};

export const Code: React.FC<TypographyProps> = ({children, className = '', style}) => {
    return (
        <code 
            className={className}
            style={{
                fontFamily: typography.fonts.mono,
                fontSize: typography.sizes.sm,
                fontWeight: typography.weights.normal,
                lineHeight: typography.lineHeights.normal,
                color: colors.text.primary,
                backgroundColor: colors.background.tertiary,
                padding: `${spacing['0.5'] || '2px'} ${spacing[1.5] || '6px'}`,
                borderRadius: '4px',
                display: 'inline-block',
                ...style
            }}
        >
            {children}
        </code>
    );
};

export const Label: React.FC<TypographyProps> = ({children, className = '', style}) => {
    return (
        <span
            className={className}
            style={{
                fontFamily: typography.fonts.sans,
                fontSize: typography.sizes.xs,
                fontWeight: typography.weights.medium,
                lineHeight: typography.lineHeights.tight,
                color: colors.text.secondary,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                margin: 0,
                ...style
            }}
        >
            {children}
        </span>
    );
};