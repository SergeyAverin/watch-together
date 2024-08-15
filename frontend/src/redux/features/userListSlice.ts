import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export enum UserStatusEnum {
  PLAY = "play",
  PAUSE = "pause",
}
export interface IUserInRoom {
  userId: string;
  currentTime: number;
  status: UserStatusEnum;
}
interface IUsersListState {
  userCount: number;
  usersInRoom: Array<IUserInRoom>;
  isPanelShow: boolean;
}

const initialState: IUsersListState = {
  userCount: 0,
  usersInRoom: [],
  isPanelShow: false,
};

export const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    setUsersCount: (state, actions: PayloadAction<number>) => {
      state.userCount = actions.payload;
    },
    setIsPanelShow(state, actions: PayloadAction<boolean>) {
      state.isPanelShow = actions.payload;
    },
    setUserInRoom(state, actions: PayloadAction<IUserInRoom>) {
      const index = state.usersInRoom.findIndex(
        (item) => item.userId === actions.payload.userId
      );
      if (index < 0) {
        state.usersInRoom.push(actions.payload);
      } else {
        state.usersInRoom[index] = actions.payload;
      }
    },
  },
});

export const { setUsersCount, setUserInRoom, setIsPanelShow } =
  userListSlice.actions;
