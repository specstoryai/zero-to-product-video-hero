import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, Sequence, spring, useVideoConfig, Img, staticFile} from 'remotion';
import {Heading, Body} from '../components/Typography';
import {Card} from '../components/Card';
import {BarChartIcon} from '../components/Icons';
import { colors, spacing, typography, borderRadius } from '../styles/design-tokens';

const LineChart: React.FC<{startFrame: number}> = ({startFrame}) => {
    const frame = useCurrentFrame();
    const {fps} = useVideoConfig();
    
    const relativeFrame = frame - startFrame;
    const isVisible = frame >= startFrame;
    
    if (!isVisible) return null;
    
    // Overall chart entrance animation
    const chartEntrance = spring({
        fps,
        frame: relativeFrame,
        config: {
            damping: 30,
            stiffness: 80,
            mass: 1
        }
    });
    
    // Show last 7 days of traffic for tny.dev/series-a (247 total clicks)
    const data = [
        {value: 28, label: ''},
        {value: 42, label: 'Tue'},
        {value: 56, label: 'Wed'},
        {value: 70, label: 'Thu'},
        {value: 51, label: 'Fri'},
        {value: 0, label: 'Sat'},
        {value: 0, label: 'Sun'}
    ];
    
    const maxValue = 80; // Fixed max for consistent scale
    const chartWidth = 300;
    const chartHeight = 120;
    const padding = 0;
    
    // Calculate positions
    const points = data.map((d, i) => ({
        x: (i / (data.length - 1)) * chartWidth,
        y: chartHeight - (d.value / maxValue) * chartHeight,
        value: d.value,
        label: d.label
    }));
    
    // Create SVG path for the line
    const pathData = points
        .map((point, i) => {
            return i === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`;
        })
        .join(' ');
    
    // Path animation length - using spring for smoother motion
    const pathSpring = spring({
        fps,
        frame: relativeFrame,
        config: {
            damping: 50,
            stiffness: 100,
            mass: 0.5
        }
    });
    
    return (
        <div style={{
            width: '100%', 
            height: '180px', 
            position: 'relative', 
            paddingTop: '20px',
            opacity: chartEntrance,
            transform: `scale(${0.95 + 0.05 * chartEntrance})`
        }}>
            <div
                style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    fontSize: '11px',
                    color: '#6B7280',
                    fontFamily: 'Geist Sans, sans-serif',
                    opacity: interpolate(
                        relativeFrame,
                        [0, 10],
                        [0, 1],
                        {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp'
                        }
                    )
                }}
            >
                Daily Clicks
            </div>
            
            {/* Y-axis labels */}
            <div
                style={{
                    position: 'absolute',
                    left: '-5px',
                    top: '20px',
                    height: chartHeight,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    fontSize: typography.sizes.xs,
                    color: colors.text.tertiary,
                    fontFamily: typography.fonts.sans,
                    opacity: interpolate(relativeFrame, [5, 25], [0, 1], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp'
                    })
                }}
            >
                <div>80</div>
                <div>40</div>
                <div>0</div>
            </div>
            
            <div style={{position: 'relative', width: '100%', height: chartHeight, marginTop: '0'}}>
                <svg
                    style={{
                        width: '100%',
                        height: '100%',
                        overflow: 'visible'
                    }}
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                >
                    {/* Grid lines */}
                    <line
                        x1="0"
                        y1={chartHeight}
                        x2={chartWidth}
                        y2={chartHeight}
                        stroke="#E5E7EB"
                        strokeWidth="1"
                    />
                    <line
                        x1="0"
                        y1={chartHeight / 2}
                        x2={chartWidth}
                        y2={chartHeight / 2}
                        stroke="#F3F4F6"
                        strokeWidth="1"
                        strokeDasharray="2,2"
                    />
                    <line
                        x1="0"
                        y1="0"
                        x2={chartWidth}
                        y2="0"
                        stroke="#F3F4F6"
                        strokeWidth="1"
                        strokeDasharray="2,2"
                    />
                    
                    {/* Area under the line */}
                    <defs>
                        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    
                    <path
                        d={`${pathData} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`}
                        fill="url(#areaGradient)"
                        opacity={pathSpring}
                    />
                    
                    {/* The line */}
                    <path
                        d={pathData}
                        fill="none"
                        stroke="#7C3AED"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        pathLength="1"
                        strokeDasharray="1"
                        strokeDashoffset={1 - pathSpring}
                    />
                    
                    {/* Data points */}
                    {points.map((point, i) => {
                        const pointSpring = spring({
                            fps,
                            frame: relativeFrame - 20 - i * 3,
                            config: {
                                damping: 200,
                                stiffness: 150
                            }
                        });
                        
                        return (
                            <g key={i}>
                                <circle
                                    cx={point.x}
                                    cy={point.y}
                                    r="4"
                                    fill="#FFFFFF"
                                    stroke="#7C3AED"
                                    strokeWidth="2"
                                    opacity={pointSpring}
                                    transform={`scale(${pointSpring})`}
                                    transformOrigin={`${point.x} ${point.y}`}
                                />
                                {point.value > 0 && (
                                    <text
                                        x={point.x}
                                        y={point.y - 10}
                                        textAnchor="middle"
                                        fontSize="10"
                                        fontWeight="600"
                                        fill="#7C3AED"
                                        opacity={pointSpring}
                                        fontFamily="Geist Sans, sans-serif"
                                    >
                                        {point.value}
                                    </text>
                                )}
                            </g>
                        );
                    })}
                </svg>
            </div>
            
            {/* X-axis labels */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '8px',
                    paddingLeft: '15px',
                    paddingRight: '0',
                    position: 'relative',
                    width: 'calc(100% - 15px)'
                }}
            >
                {data.map((d, i) => (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: `${(i / (data.length - 1)) * 100}%`,
                            transform: 'translateX(-50%)',
                            fontSize: '11px',
                            color: '#6B7280',
                            fontFamily: 'Geist Sans, sans-serif',
                            opacity: interpolate(
                                relativeFrame - 10 - i * 2,
                                [0, 10],
                                [0, 1],
                                {
                                    extrapolateLeft: 'clamp',
                                    extrapolateRight: 'clamp'
                                }
                            )
                        }}
                    >
                        {d.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

const GeoMap: React.FC<{startFrame: number}> = ({startFrame}) => {
    const frame = useCurrentFrame();
    
    const relativeFrame = frame - startFrame;
    const isVisible = frame >= startFrame;
    
    if (!isVisible) return null;
    
    const locations = [
        {x: 30, y: 35, size: 12, label: 'USA'},
        {x: 50, y: 30, size: 8, label: 'UK'},
        {x: 55, y: 35, size: 6, label: 'DE'},
        {x: 75, y: 45, size: 10, label: 'JP'},
        {x: 35, y: 55, size: 7, label: 'BR'}
    ];
    
    return (
        <div
            style={{
                width: '100%',
                height: '200px',
                backgroundColor: '#F9FAFB',
                borderRadius: borderRadius.md,
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* World map background using the SVG file */}
            <Img
                src={staticFile('noun-world-map-597572.svg')}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '140%',
                    height: '140%',
                    objectFit: 'contain',
                    opacity: interpolate(
                        relativeFrame,
                        [0, 15],
                        [0, 0.15],
                        {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp'
                        }
                    ),
                    filter: `invert(47%) sepia(73%) saturate(5134%) hue-rotate(248deg) brightness(93%) contrast(91%)`
                }}
            />
            
            {locations.map((loc, i) => {
                const scale = interpolate(
                    relativeFrame - i * 3,
                    [0, 10],
                    [0, 1],
                    {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp'
                    }
                );
                
                return (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: `${loc.x}%`,
                            top: `${loc.y}%`,
                            transform: `translate(-50%, -50%) scale(${scale})`
                        }}
                    >
                        <div
                            style={{
                                width: loc.size * 3,
                                height: loc.size * 3,
                                borderRadius: '50%',
                                backgroundColor: '#7C3AED',
                                opacity: 0.3,
                                animation: 'pulse 2s infinite'
                            }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: loc.size,
                                height: loc.size,
                                borderRadius: '50%',
                                backgroundColor: '#7C3AED',
                                border: '2px solid white'
                            }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                top: '100%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                marginTop: '4px',
                                fontSize: '10px',
                                fontWeight: 600,
                                color: '#4B5563',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {loc.label}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

interface AnalyticsCardProps {
    children: React.ReactNode;
    startFrame: number;
    index: number;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({children, startFrame, index}) => {
    const frame = useCurrentFrame();
    const {fps} = useVideoConfig();
    
    const relativeFrame = frame - startFrame;
    const isVisible = frame >= startFrame;
    
    if (!isVisible) return null;
    
    const scale = spring({
        fps,
        frame: Math.max(0, relativeFrame),
        config: {
            damping: 200,
            stiffness: 200
        }
    });
    
    const opacity = interpolate(
        relativeFrame,
        [0, 10],
        [0, 1],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
        }
    );
    
    const translateY = interpolate(
        relativeFrame,
        [0, 15],
        [30, 0],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
        }
    );
    
    return (
        <div
            style={{
                transform: `scale(${scale}) translateY(${translateY}px)`,
                opacity,
                transformOrigin: 'center'
            }}
        >
            <Card style={{height: '100%'}}>
                {children}
            </Card>
        </div>
    );
};

export const AnalyticsScene: React.FC = () => {
    const frame = useCurrentFrame();
    
    // Timeline - compressed for 180 frames
    const headerStart = 0;
    const card1Start = 20;
    const card2Start = 30;
    const card3Start = 40;
    const card4Start = 50;
    const bottomTextStart = 90;
    
    return (
        <AbsoluteFill
            style={{
                backgroundColor: '#FFFFFF',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    padding: '60px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {/* Header */}
                <div
                    style={{
                        textAlign: 'center',
                        marginBottom: '40px',
                        opacity: interpolate(frame, [headerStart, headerStart + 15], [0, 1], {
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
                        Analytics Dashboard
                    </p>
                    <Heading style={{
                        fontSize: typography.sizes['4xl'],
                        fontWeight: typography.weights.bold,
                        letterSpacing: typography.letterSpacing.tighter,
                        marginBottom: spacing[4]
                    }}>
                        Real-Time Analytics
                    </Heading>
                    <Body style={{
                        fontSize: typography.sizes.lg,
                        color: colors.text.secondary,
                        lineHeight: typography.lineHeights.relaxed
                    }}>
                        Track performance, understand your audience, optimize your content
                    </Body>
                </div>
                
                {/* Analytics Grid - All cards in one container */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '24px',
                        maxWidth: '900px',
                        width: '100%'
                    }}
                >
                    {/* Traffic Overview */}
                    <AnalyticsCard startFrame={card1Start} index={0}>
                        <div style={{display: 'flex', alignItems: 'center', gap: spacing[3], marginBottom: spacing[5]}}>
                            <BarChartIcon size={24} color={colors.brand.purple} />
                            <h3 style={{
                                fontFamily: typography.fonts.sans,
                                fontSize: typography.sizes.lg,
                                fontWeight: typography.weights.semibold,
                                margin: 0
                            }}>
                                Weekly Traffic
                            </h3>
                        </div>
                        <LineChart startFrame={card1Start + 10} />
                    </AnalyticsCard>
                    
                    {/* Geographic Distribution */}
                    <AnalyticsCard startFrame={card2Start} index={1}>
                        <div style={{display: 'flex', alignItems: 'center', gap: spacing[3], marginBottom: spacing[5]}}>
                            <span style={{fontSize: '24px'}}>🌍</span>
                            <h3 style={{
                                fontFamily: typography.fonts.sans,
                                fontSize: typography.sizes.lg,
                                fontWeight: typography.weights.semibold,
                                margin: 0
                            }}>
                                Global Reach
                            </h3>
                        </div>
                        <GeoMap startFrame={card2Start + 10} />
                    </AnalyticsCard>
                    
                    {/* Device Stats */}
                    <AnalyticsCard startFrame={card3Start} index={2}>
                        <div style={{display: 'flex', alignItems: 'center', gap: spacing[3], marginBottom: spacing[5]}}>
                            <span style={{fontSize: '24px'}}>📱</span>
                            <h3 style={{
                                fontFamily: typography.fonts.sans,
                                fontSize: typography.sizes.lg,
                                fontWeight: typography.weights.semibold,
                                margin: 0
                            }}>
                                Device Analytics
                            </h3>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                            {[
                                {device: 'Mobile', percent: 58, color: '#10B981'},
                                {device: 'Desktop', percent: 35, color: colors.brand.purple},
                                {device: 'Tablet', percent: 7, color: '#F59E0B'}
                            ].map((item, i) => (
                                <div key={i} style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                                    <div style={{width: '80px', fontSize: '14px', color: '#4B5563'}}>
                                        {item.device}
                                    </div>
                                    <div style={{flex: 1, height: '24px', backgroundColor: '#F3F4F6', borderRadius: '4px', overflow: 'hidden'}}>
                                        <div
                                            style={{
                                                width: `${item.percent * interpolate(frame - card3Start - 15 - i * 5, [0, 40], [0, 1], {
                                                    extrapolateLeft: 'clamp',
                                                    extrapolateRight: 'clamp'
                                                })}%`,
                                                height: '100%',
                                                backgroundColor: item.color
                                            }}
                                        />
                                    </div>
                                    <div style={{width: '40px', textAlign: 'right', fontSize: '14px', fontWeight: 600}}>
                                        {item.percent}%
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AnalyticsCard>
                    
                    {/* Conversion Stats */}
                    <AnalyticsCard startFrame={card4Start} index={3}>
                        <div style={{display: 'flex', alignItems: 'center', gap: spacing[3], marginBottom: spacing[5]}}>
                            <span style={{fontSize: '24px'}}>🎯</span>
                            <h3 style={{
                                fontFamily: typography.fonts.sans,
                                fontSize: typography.sizes.lg,
                                fontWeight: typography.weights.semibold,
                                margin: 0
                            }}>
                                Performance Metrics
                            </h3>
                        </div>
                        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px'}}>
                            {[
                                {label: 'Total Clicks', value: '2,089', trend: '+247'},
                                {label: 'QR Scans', value: '156', trend: '+23'},
                                {label: 'Referrer Count', value: '42', trend: '+8'},
                                {label: 'Recent Clicks', value: '58', trend: 'Today'}
                            ].map((metric, i) => (
                                <div
                                    key={i}
                                    style={{
                                        opacity: interpolate(frame - card4Start - 10 - i * 3, [0, 10], [0, 1], {
                                            extrapolateLeft: 'clamp',
                                            extrapolateRight: 'clamp'
                                        })
                                    }}
                                >
                                    <div style={{fontSize: typography.sizes.xs, color: colors.text.secondary, marginBottom: spacing[1]}}>
                                        {metric.label}
                                    </div>
                                    <div style={{fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, marginBottom: '2px'}}>
                                        {metric.value}
                                    </div>
                                    <div style={{fontSize: typography.sizes.xs, color: metric.trend.startsWith('+') ? colors.semantic.success : colors.text.secondary}}>
                                        {metric.trend}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AnalyticsCard>
                </div>
                
                {/* Bottom text */}
                {frame >= bottomTextStart && (
                    <div
                        style={{
                            textAlign: 'center',
                            marginTop: '40px',
                            opacity: interpolate(frame - bottomTextStart, [0, 20], [0, 1], {
                                extrapolateLeft: 'clamp',
                                extrapolateRight: 'clamp'
                            })
                        }}
                    >
                        <Body style={{fontSize: '16px'}}>
                            All metrics available via API • Real-time webhooks • 90-day retention
                        </Body>
                    </div>
                )}
            </div>
        </AbsoluteFill>
    );
};