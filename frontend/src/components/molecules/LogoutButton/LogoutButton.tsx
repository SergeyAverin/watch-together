import React from "react";

import { Flex, IconButton } from "@atoms/index";

import LogoutIcon from "@public/LogoutIcon.svg";
import { useNavigate } from "react-router-dom";

export const LogoutButton: React.FC = () => {
  const navigation = useNavigate();
  const onClick = () => {
    navigation("/auth/logout");
  };

  return (
    <Flex alignItems="center" justifyContent="center" flexDirection="column">
      <IconButton icon={<LogoutIcon />} clickFunction={onClick} />
    </Flex>
  );
};
