import React from "react";

import { ProgressBar } from "@atoms/index";


interface IVideoProgressBarProps {
    video: HTMLVideoElement | null;
  }
export const VideoProgressBar: React.FC<IVideoProgressBarProps> = ({video}) => {
    const onChangeProgressBar = (value: number) => {
        if (video) {
            video.currentTime = (video.duration * value) / 100;
        }
    }
    return (
        <ProgressBar onChangeProgressBar={onChangeProgressBar}  />
    )
}
