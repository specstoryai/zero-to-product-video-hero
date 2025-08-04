import React from 'react';
import {Composition} from 'remotion';
import {HeroAnimation} from './HeroAnimation';

export const HeroVideo: React.FC = () => {
  return (
    <>
      <Composition
        id="HeroVideo"
        component={HeroAnimation}
        durationInFrames={1170} // 39 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};