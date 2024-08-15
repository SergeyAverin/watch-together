import React, { useState } from "react";

import { formatVideoTime } from "@utils/formatTime";


import "./TimeWidget.sass";

interface ITimeWidgetProps {
  duration: number;
  currentTime: number;
}

export const TimeWidget: React.FC<ITimeWidgetProps> = ({
  currentTime,
  duration,
}) => {
  const [isTimeWidget, setIsTimeWidget] = useState(true);

  return (
    <div
      className="time-widget"
      onClick={() => setIsTimeWidget((prev) => !prev)}
    >
      {isTimeWidget ? (
        <>
          {formatVideoTime(currentTime as number)} /{" "}
          {formatVideoTime(duration as number)}
        </>
      ) : (
        <>
          -
          {duration &&
            currentTime &&
            formatVideoTime((duration - currentTime) as number)}{" "}
          / {duration && formatVideoTime(duration as number)}
        </>
      )}
    </div>
  );
};
