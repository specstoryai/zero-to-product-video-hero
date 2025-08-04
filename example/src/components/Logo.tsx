import React from 'react';
import {Img, staticFile, interpolate, useCurrentFrame} from 'remotion';

interface LogoProps {
    size?: 'sm' | 'md' | 'lg';
    animated?: boolean;
    animationDelay?: number;
}

export const Logo: React.FC<LogoProps> = ({
    size = 'md',
    animated = false,
    animationDelay = 0
}) => {
    const frame = useCurrentFrame();
    
    const scale = animated ? interpolate(
        frame - animationDelay,
        [0, 20],
        [0, 1],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
        }
    ) : 1;
    
    const rotate = animated ? interpolate(
        frame - animationDelay,
        [0, 20],
        [-180, 0],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
        }
    ) : 0;
    
    const sizeMap = {
        sm: { width: 140, height: 40 },
        md: { width: 210, height: 60 },
        lg: { width: 280, height: 80 }
    };
    
    const dimensions = sizeMap[size];
    
    return (
        <div
            style={{
                transform: `scale(${scale}) rotate(${rotate}deg)`,
                transformOrigin: 'center',
                display: 'inline-block'
            }}
        >
            <Img
                src={staticFile('tny.svg')}
                style={{
                    width: dimensions.width,
                    height: dimensions.height,
                    objectFit: 'contain'
                }}
                onError={(e) => {
                    console.error('Failed to load logo:', e);
                }}
            />
        </div>
    );
};