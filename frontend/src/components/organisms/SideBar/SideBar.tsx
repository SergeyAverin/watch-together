import React from "react";

import { Flex, Margin, IconButton } from "@atoms/index";

import "./SideBar.sass";
import CopyLinkIcon from "@public/CopyLinkIcon.svg";
import { UserCount } from "@molecules/UserCount";
import { FollowPanelButton } from "@molecules/FollowPanelButton/FollowPanelButton";
import LogoutButton from "@molecules/LogoutButton";

interface ISideBarProps {}

const SideBar: React.FC<ISideBarProps> = () => {
  const copyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
  };
  return (
    <div className="side-bar">
      <Flex
        justifyContent="space-around"
        alignItems="center"
        flexDirection="column"
      >
        <div>
          <IconButton icon={<CopyLinkIcon />} clickFunction={copyLink} />
          <UserCount />
          <FollowPanelButton />
        </div>
        <div>sdf</div>
        <div>
          <LogoutButton />
        </div>
      </Flex>
    </div>
  );
};

export default SideBar;
