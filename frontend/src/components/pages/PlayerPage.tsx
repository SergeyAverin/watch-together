import React, { useState } from "react";

import { Center } from "@atoms/index";
import { VideoPlayer } from "@organisms/VideoPlayer";
import { SideBar } from "@organisms/SideBar";


const PlayerPage: React.FC = () => {
  const [users, setUsers] = useState(0)

  return (
    <Center>
      <div>
        <SideBar userCount={users} />
        <VideoPlayer setUsers={setUsers} />
      </div>
    </Center>
  );
};

export default PlayerPage;
