import React from "react";

import PlayIcon from '@public/PlayIcon.svg'


interface IPlayVideoProps {
  video: HTMLVideoElement | null;
  setPaused: Function
}

const PlayVideo: React.FC<IPlayVideoProps> = ({ video, setPaused }) => {
  const onPlay = () => {
    if (video) {
      video.play();
      setPaused(false)
    }
  };
  return (
        <div onClick={onPlay}>
            <PlayIcon />
        </div>
  );
};

export default PlayVideo;
