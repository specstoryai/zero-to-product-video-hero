import React from 'react';
import {interpolate, useCurrentFrame, spring, useVideoConfig} from 'remotion';

interface IconProps {
    size?: number;
    color?: string;
    animated?: boolean;
    animationDelay?: number;
}

export const CheckIcon: React.FC<IconProps> = ({
    size = 24,
    color = '#10B981',
    animated = false,
    animationDelay = 0
}) => {
    const frame = useCurrentFrame();
    const {fps} = useVideoConfig();
    
    // Circle scale with spring
    const circleScale = animated ? spring({
        frame: frame - animationDelay,
        fps,
        config: {
            damping: 150,
            stiffness: 200
        }
    }) : 1;
    
    // Check path animation
    const pathLength = animated ? interpolate(
        frame - animationDelay - 5,
        [0, 12],
        [0, 1],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
        }
    ) : 1;
    
    // Bounce effect for the whole icon
    const bounce = animated ? interpolate(
        frame - animationDelay,
        [15, 20, 25],
        [1, 1.1, 1],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
        }
    ) : 1;
    
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                transform: `scale(${bounce})`
            }}
        >
            {/* Background circle */}
            <circle
                cx="12"
                cy="12"
                r="10"
                fill={color}
                opacity={0.1}
                transform={`scale(${circleScale})`}
                transformOrigin="center"
            />
            {/* Main circle */}
            <circle
                cx="12"
                cy="12"
                r="9"
                stroke={color}
                strokeWidth="2"
                fill="none"
                transform={`scale(${circleScale})`}
                transformOrigin="center"
            />
            {/* Check mark */}
            <path
                d="M16.5 8.5L10.5 14.5L7.5 11.5"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                strokeDasharray={animated ? 20 : 0}
                strokeDashoffset={animated ? 20 * (1 - pathLength) : 0}
            />
        </svg>
    );
};

export const LinkIcon: React.FC<IconProps> = ({
    size = 24,
    color = '#000000',
    animated = false,
    animationDelay = 0
}) => {
    const frame = useCurrentFrame();
    
    const rotate = animated ? interpolate(
        frame - animationDelay,
        [0, 20],
        [0, 360],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
        }
    ) : 0;
    
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                transform: `rotate(${rotate}deg)`,
                transformOrigin: 'center'
            }}
        >
            <path
                d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const BarChartIcon: React.FC<IconProps> = ({
    size = 24,
    color = '#000000',
    animated = false,
    animationDelay = 0
}) => {
    const frame = useCurrentFrame();
    
    const bar1Height = animated ? interpolate(
        frame - animationDelay,
        [0, 10],
        [0, 1],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
        }
    ) : 1;
    
    const bar2Height = animated ? interpolate(
        frame - animationDelay - 5,
        [0, 10],
        [0, 1],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
        }
    ) : 1;
    
    const bar3Height = animated ? interpolate(
        frame - animationDelay - 10,
        [0, 10],
        [0, 1],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
        }
    ) : 1;
    
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="3"
                y={18 - 12 * bar1Height}
                width="6"
                height={12 * bar1Height}
                fill={color}
                rx="1"
            />
            <rect
                x="9"
                y={18 - 18 * bar2Height}
                width="6"
                height={18 * bar2Height}
                fill={color}
                rx="1"
            />
            <rect
                x="15"
                y={18 - 8 * bar3Height}
                width="6"
                height={8 * bar3Height}
                fill={color}
                rx="1"
            />
            <line
                x1="0"
                y1="20"
                x2="24"
                y2="20"
                stroke={color}
                strokeWidth="2"
            />
        </svg>
    );
};

export const ArrowRightIcon: React.FC<IconProps> = ({
    size = 24,
    color = '#000000',
    animated = false,
    animationDelay = 0
}) => {
    const frame = useCurrentFrame();
    
    const translateX = animated ? interpolate(
        frame - animationDelay,
        [0, 15, 30],
        [0, 5, 0],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
        }
    ) : 0;
    
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                transform: `translateX(${translateX}px)`
            }}
        >
            <path
                d="M5 12H19"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12 5L19 12L12 19"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};