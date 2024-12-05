import RoomCard from "@organisms/RoomCard";
import React from "react";
import "./RoomPage.sass";
import { Typography, TypographyVariant } from "@atoms/index";

export const RoomsPage: React.FC = () => {
  return (
    <div className="wrapper">
      <Typography variant={TypographyVariant.H1}>Owned room</Typography>
      <div className="roomCardGrid">
        <RoomCard />
        <RoomCard />
        <RoomCard />
      </div>
      <Typography variant={TypographyVariant.H1}>Joined rooms</Typography>
      <div className="roomCardGrid">
        <RoomCard />
        <RoomCard />
        <RoomCard />
      </div>
    </div>
  );
};
