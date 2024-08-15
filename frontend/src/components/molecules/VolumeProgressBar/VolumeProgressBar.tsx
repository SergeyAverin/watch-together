import React from "react";

import { ProgressBar } from "@atoms/index";
import { IconButton } from "@atoms/index";

import VolumeLowIcon from '@public/VolumeLowIcon.svg'
import VolumeMaxIcon from '@public/VolumeMaxIcon.svg'
import VolumeMuteIcon from '@public/VolumeMuteIcon.svg'

import './VolumeProgressBar.sass'


interface IVolumeProgressBarProps {
  progress: number;
  video: HTMLVideoElement | null;
}
export const VolumeProgressBar: React.FC<IVolumeProgressBarProps> = ({
  progress,
  video,
}) => {
  const onChangeProgressBar = (value: number) => {
    if (video && value >= 0) {
      video.volume = value / 100;
      console.log(video.volume)
    }
  };
  const onIconClick = () => {
    if (video) {
      video.muted = !video?.muted
    }
  }
  return (
    <div className="volume-progress-bar">
      <div className="volume-progress-bar__icon">
        {video && (video.volume == 0 || video?.muted) && <IconButton icon={<VolumeMuteIcon />} clickFunction={onIconClick} />}
        {video && video.volume <= 0.5  && video.volume != 0 && video?.muted == false && <IconButton icon={<VolumeLowIcon />} clickFunction={onIconClick} />}
        {video && video.volume  > 0.5 && video?.muted == false  && <IconButton icon={<VolumeMaxIcon />} clickFunction={onIconClick} />}
      </div>
      <div className="volume-progress-bar__bar">
        <ProgressBar onChangeProgressBar={onChangeProgressBar} />
      </div>
    </div>
  );
};
