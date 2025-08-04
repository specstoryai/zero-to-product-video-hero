import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

interface URLInputProps {
    value: string;
    placeholder?: string;
    animated?: boolean;
    animationDelay?: number;
    showCursor?: boolean;
}

export const URLInput: React.FC<URLInputProps> = ({
    value,
    placeholder = 'Enter your URL',
    animated = false,
    animationDelay = 0,
    showCursor = false
}) => {
    const frame = useCurrentFrame();
    
    const width = animated ? interpolate(
        frame - animationDelay,
        [0, 15],
        [0, 100],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
        }
    ) : 100;
    
    const cursorOpacity = showCursor ? interpolate(
        frame % 30,
        [0, 15, 30],
        [1, 0, 1]
    ) : 0;
    
    const displayValue = animated ? value.slice(0, Math.floor(
        interpolate(
            frame - animationDelay - 15,
            [0, value.length * 2],
            [0, value.length],
            {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp'
            }
        )
    )) : value;
    
    return (
        <div
            style={{
                position: 'relative',
                width: `${width}%`,
                maxWidth: '600px',
                overflow: 'hidden'
            }}
        >
            <input
                type="text"
                value={displayValue}
                placeholder={placeholder}
                readOnly
                style={{
                    width: '100%',
                    padding: '16px 20px',
                    fontSize: '18px',
                    fontFamily: 'Geist Sans, sans-serif',
                    border: '2px solid #E5E7EB',
                    borderRadius: '10px',
                    backgroundColor: '#F9FAFB',
                    color: '#000000',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                }}
            />
            {showCursor && (
                <span
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: `${20 + displayValue.length * 10}px`,
                        transform: 'translateY(-50%)',
                        width: '2px',
                        height: '24px',
                        backgroundColor: '#000000',
                        opacity: cursorOpacity
                    }}
                />
            )}
        </div>
    );
};