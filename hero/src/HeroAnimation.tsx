import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {VideoIntro} from './scenes/0-VideoIntro';
import {TimeTransition} from './scenes/2-TimeTransition';
import {ModernDeveloper} from './scenes/3-ModernDeveloper';
import {IntentOverlay} from './scenes/4-IntentOverlay';
import {BenefitsAndLogos} from './scenes/5-BenefitsAndLogos';
import {colors} from './styles/design-tokens';

export const HeroAnimation: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: colors.background.dark}}>
      <Series>
        {/* Scene 0: Video intro with medieval monk (0-150 frames / 5 seconds) */}
        <Series.Sequence durationInFrames={150}>
          <VideoIntro src="intro.mp4" />
        </Series.Sequence>
        
        {/* Scene 1: Time transition (150-270 frames / 4 seconds) */}
        <Series.Sequence durationInFrames={120}>
          <TimeTransition />
        </Series.Sequence>
        
        {/* Scene 2: Modern developer (210-420 frames / 7 seconds) */}
        <Series.Sequence durationInFrames={210}>
          <ModernDeveloper />
        </Series.Sequence>
        
        {/* Scene 3: Intent overlay (420-570 frames / 5 seconds) */}
        <Series.Sequence durationInFrames={150}>
          <IntentOverlay />
        </Series.Sequence>
        
        {/* Scene 4: Benefits and Logos (630-1170 frames / 18 seconds) */}
        <Series.Sequence durationInFrames={540}>
          <BenefitsAndLogos />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};