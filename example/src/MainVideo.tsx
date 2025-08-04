import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {OpeningScene} from './scenes/OpeningScene';
import {InstallationScene} from './scenes/InstallationScene';
import {ClaudeDemo} from './scenes/ClaudeDemo';
import {AnalyticsScene} from './scenes/AnalyticsScene';
import {ClosingCTA} from './scenes/ClosingCTA';

export const MainVideo: React.FC<{title: string}> = ({title}) => {
    return (
        <AbsoluteFill style={{backgroundColor: '#FFFFFF'}}>
            <Series>
                <Series.Sequence durationInFrames={90}>
                    <OpeningScene />
                </Series.Sequence>
                
                <Series.Sequence durationInFrames={105}>
                    <InstallationScene />
                </Series.Sequence>
                
                <Series.Sequence durationInFrames={255}>
                    <ClaudeDemo />
                </Series.Sequence>
                
                <Series.Sequence durationInFrames={195}>
                    <AnalyticsScene />
                </Series.Sequence>
                
                <Series.Sequence durationInFrames={255}>
                    <ClosingCTA />
                </Series.Sequence>
            </Series>
        </AbsoluteFill>
    );
};