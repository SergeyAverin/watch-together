import React from "react";

import { Flex, IconButton } from "@atoms/index";

import RewindLeft from "@public/RewindLeft.svg";
import RewindRight from "@public/RewindRight.svg";

interface IRewindButtonsProps {
  rewind: Function;
}

export const RewindButtons: React.FC<IRewindButtonsProps> = ({ rewind }) => {
  return (
    <Flex alignItems="flex-start" justifyContent="flex-start">
      <IconButton clickFunction={() => rewind(-10)} icon={<RewindLeft />} />
      <IconButton clickFunction={() => rewind(10)} icon={<RewindRight />} />
    </Flex>
  );
};
