import React, { useRef, useState } from "react";

import "./ProgressBar.sass";

interface IProgressBarProps {
  progress?: number;
  onChangeProgressBar: Function;
}

export const ProgressBar: React.FC<IProgressBarProps> = ({
  progress,
  onChangeProgressBar,
}) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [progressState, setProgressState] = useState(progress);
  const [isDown, setIsDown] = useState(false)
  const changeCurrentTime = async (event: React.MouseEvent, isClick: boolean) => {
    if (progressBarRef.current && (isDown || isClick)) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const position = event.clientX - rect.left;
      const newValue = Math.round((position / rect.width) * 100) + 1;
      setProgressState(newValue);
      onChangeProgressBar(newValue);
    }
  };
  const onMouseDown = () => setIsDown(true);
  const onMouseUp = () => setIsDown(false);
  return (
    <div className="propgress-bar" ref={progressBarRef} onMouseMove={(event: React.MouseEvent) => changeCurrentTime(event, false)}  onClick={(event: React.MouseEvent) => changeCurrentTime(event, true)} onMouseDown={onMouseDown} onMouseUp={onMouseUp} >
      <div className="propgress-bar__line" />
      <div
        className="propgress-bar__active"
        style={{ width: `${progressState}%` }}
      >
        <div className="propgress-bar__elips"></div>
      </div>
    </div>
  );
};

ProgressBar.defaultProps = {
  progress: 0
}
