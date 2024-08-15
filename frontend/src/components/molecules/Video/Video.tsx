import React from "react";

import "./Video.sass";


interface IVideoProps {
  src: string;
  handleLoadedMetadata: Function;
  handleTimeUpdate: Function;
  videoPause: Function;
  videoPlay: Function;
  videoRef: React.RefObject<HTMLVideoElement>;
}

export const Video: React.FC<IVideoProps> = ({
  handleLoadedMetadata,
  handleTimeUpdate,
  src,
  videoPause,
  videoPlay,
  videoRef,
}) => {
  return (
    <video
      className="video"
      onLoadedMetadata={() => handleLoadedMetadata()}
      onTimeUpdate={() => handleTimeUpdate()}
      onPause={() => videoPause()}
      onPlay={() => videoPlay()}
      ref={videoRef}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};
