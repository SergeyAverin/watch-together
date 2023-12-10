import React from "react";

import { Center } from "@atoms/index";
import { VideoPlayer } from "@organisms/VideoPlayer";
import { SideBar } from "@organisms/SideBar";
import { UsersPanel } from "@organisms/UsersPanel";


const PlayerPage: React.FC = () => {
  return (
    <Center>
      <div>
        <SideBar />
        <VideoPlayer />
        <UsersPanel />
      </div>
    </Center>
  );
};

export default PlayerPage;
