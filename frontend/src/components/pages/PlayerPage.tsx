import React from "react";

import { Center } from "@atoms/index";
import { VideoPlayer } from "@organisms/VideoPlayer";


const PlayerPage: React.FC = () => {

  return (
    <Center>
      <div>
        <VideoPlayer />
      </div>
    </Center>
  );
};

export default PlayerPage;
