import React from "react";

import { Center } from "@atoms/index";
import { VideoPlayer } from "@organisms/VideoPlayer";
import { SideBar } from "@organisms/SideBar";
import { UsersPanel } from "@organisms/UsersPanel";
import { FollowPanel } from "@organisms/FollowPanel/FollowPanel";
import { withAuth } from "@hocs/withAuth";


const PlayerPage: React.FC = () => {
  return (
    <Center>
      <div>
        <SideBar />
        <VideoPlayer />
        <UsersPanel />
        <FollowPanel />
      </div>
    </Center>
  );
};

export default withAuth(PlayerPage);
