import React, { useRef, useState } from "react";

import "./VideoPropgressBar.sass";

interface IVideoPropgressBarProps {
  progress: number;
  video: HTMLVideoElement | null;
}

export const VideoPropgressBar: React.FC<IVideoPropgressBarProps> = ({
  progress,
  video,
}) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [progressState, setProgressState] = useState(progress);
  const [isDown, setIsDown] = useState(false)
  const changeCurrentTime = async (event: React.MouseEvent, isClick: boolean) => {
    if (progressBarRef.current && (isDown || isClick)) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const position = event.clientX - rect.left;
      const newValue = Math.round((position / rect.width) * 100);
      setProgressState(newValue);
      if (video) {
        video.currentTime = (video.duration * newValue) / 100;
      }
    }
  };
  const onMouseDown = () => setIsDown(true);
  const onMouseUp = () => setIsDown(false);
  return (
    <div className="video-propgress-bar" ref={progressBarRef} onMouseMove={(event: React.MouseEvent) => changeCurrentTime(event, false)}  onClick={(event: React.MouseEvent) => changeCurrentTime(event, true)} onMouseDown={onMouseDown} onMouseUp={onMouseUp} >
      <div className="video-propgress-bar__line" />
      <div
        className="video-propgress-bar__active"
        style={{ width: `${progressState}%` }}
      >
        <div className="video-propgress-bar__elips"></div>
      </div>
    </div>
  );
};

VideoPropgressBar.defaultProps = {
  progress: 0
}
