import React from "react";

import { PanelWrapper } from "@atoms/index";
import { useAppSelector } from "@hooks/storeHooks";
import { isPanelShowSelector, userInRoomSelector, usersCountSelector } from "@redux/selectors/usersListSelectores";
import { formatVideoTime } from "@utils/formatTime";

import "./UserPanelStyled.sass"


export const UsersPanel: React.FC = () => {
  const userInRoom = useAppSelector(userInRoomSelector);
  const userCount = useAppSelector(usersCountSelector)
  const isPanelShow = useAppSelector(isPanelShowSelector)

  return (
    <>
    {isPanelShow &&
    <PanelWrapper>
        <h2>{userCount} user in room</h2>
      {userInRoom.map((user) => (
        <div className="user-in-room">
            <div>{user.userId}</div>
            <div className={`user-in-room_${user.status}`}>{user.status}</div>
            <div>{formatVideoTime(user.currentTime)}</div>
        </div>
      ))}
    </PanelWrapper>
    }
    </>
  );
};
