import React from "react";

import PauseIcon from '@public/PauseIcon.svg'

interface IPauseVideoProps {
  video: HTMLVideoElement | null;
  setPaused: Function
}

const PauseVideo: React.FC<IPauseVideoProps> = ({ video, setPaused }) => {
  const onPause= () => {
    if (video) {
      video.pause();
      setPaused(true)
    }
  };
  return (
        <div onClick={onPause}>
          <PauseIcon />
        </div>
  );
};

export default PauseVideo;
