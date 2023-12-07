import React from "react";

import { IconButton } from "@atoms/index";
import { useAppSelector } from "@hooks/storeHooks";
import { isPausedSelector } from "@redux/selectors/playerSelectores";

import PauseIcon from "@public/PauseIcon.svg";
import PlayIcon from "@public/PlayIcon.svg";

interface IPlayButtonProps {
  videoPlay: Function;
  videoPause: Function;
}

export const PlayButton: React.FC<IPlayButtonProps> = ({
  videoPlay,
  videoPause,
}) => {
  const isPaused = useAppSelector(isPausedSelector);
  return (
    <>
      {isPaused ? (
        <IconButton clickFunction={videoPlay} icon={<PlayIcon />} />
      ) : (
        <IconButton clickFunction={videoPause} icon={<PauseIcon />} />
      )}
    </>
  );
};
