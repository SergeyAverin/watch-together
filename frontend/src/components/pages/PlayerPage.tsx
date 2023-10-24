import React from "react";

import { Center } from "@atoms/index";
import { VideoPlayer } from "@organisms/VideoPlayer";
import { SideBar } from "@organisms/SideBar";


const PlayerPage: React.FC = () => {

  return (
    <Center>
      <div>
        <SideBar />
        <VideoPlayer />
      </div>
    </Center>
  );
};

export default PlayerPage;
