import { RootState } from "@redux/store";

export const usersCountSelector = (state: RootState) =>
  state.usersList.userCount;
export const userInRoomSelector = (state: RootState) =>
  state.usersList.usersInRoom;
export const isPanelShowSelector = (state: RootState) =>
  state.usersList.isPanelShow;
