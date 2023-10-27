import React from "react";

import { ProgressBar } from "@atoms/index";


interface IVideoProgressBarProps {
    progress: number;
    video: HTMLVideoElement | null;
  }
export const VideoProgressBar: React.FC<IVideoProgressBarProps> = ({progress, video}) => {
    const onChangeProgressBar = (value: number) => {
        if (video) {
            video.currentTime = (video.duration * value) / 100;
        }
    }
    return (
        <ProgressBar onChangeProgressBar={onChangeProgressBar}  />
    )
}
