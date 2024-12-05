import React from "react";

import { Center } from "@atoms/index";
import { VideoPlayer } from "@organisms/VideoPlayer";
import { SideBar } from "@organisms/SideBar";
import { UsersPanel } from "@organisms/UsersPanel";
import { FollowPanel } from "@organisms/FollowPanel/FollowPanel";
import { withAuth } from "@hocs/withAuth";

export const PlayerPage: React.FC = withAuth(() => {
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
});
