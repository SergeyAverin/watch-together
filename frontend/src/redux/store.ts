import { configureStore } from "@reduxjs/toolkit";

import { playerSlice } from "./features/playerSlice";
import { userListSlice } from "./features/userListSlice";
import { followSLice } from "./features/followSlice";

export const store = configureStore({
  reducer: {
    player: playerSlice.reducer,
    usersList: userListSlice.reducer,
    followSLice: followSLice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
