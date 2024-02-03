import React, { useState } from "react";

import { Flex, Margin, ToggleMenu } from "@atoms/index";
import "./VideoSpeed.sass"

import SpeedIcon from "@public/SpeedIcon.svg";


interface IVideoSpeedProps {
  video: HTMLVideoElement | null;
}

export const VideoSpeed: React.FC<IVideoSpeedProps> = ({video}) => {
  const [speed, setSpeed] = useState(1)
  const onItemClick = (event: React.MouseEvent<HTMLElement>) => {
      if (video) {
        const item = event.target as HTMLElement
        video.playbackRate = Number(item.innerHTML) 
        setSpeed(Number(item.innerHTML) )
    }
  }
  return (
    <div>
      <ToggleMenu
        title={
            <div className="video-speed__title">
          <Flex justifyContent="flex-start" alignItems="center">
            <SpeedIcon />
            Speed { video && speed}
          </Flex>
            </div>
        }
        onItemClickFunction={onItemClick}
      >
        <div className="video-speed__item"><Margin marginTop="10px">0.25</Margin></div>
        <div className="video-speed__item"><Margin marginTop="10px">0.75</Margin></div>
        <div className="video-speed__item"><Margin marginTop="10px">0.5</Margin></div>
        <div className="video-speed__item"><Margin marginTop="10px">1</Margin></div>
        <div className="video-speed__item"><Margin marginTop="10px">1.5</Margin></div>
        <div className="video-speed__item"><Margin marginTop="10px">1.75</Margin></div>
        <div className="video-speed__item"><Margin marginTop="10px">2</Margin></div>
      </ToggleMenu>
    </div>
  );
};
