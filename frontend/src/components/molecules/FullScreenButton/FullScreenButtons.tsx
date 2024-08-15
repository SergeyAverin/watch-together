import { IconButton } from "@atoms/index";
import React from "react";

import FullScreenIcon from "@public/FullScreenIcon.svg";

interface IFullScreenButtonProps {
  openFullScreen: Function;
}

export const FullScreenButton: React.FC<IFullScreenButtonProps> = ({
  openFullScreen,
}) => {
  return (
    <>
      <IconButton icon={<FullScreenIcon />} clickFunction={openFullScreen} />
    </>
  );
};
