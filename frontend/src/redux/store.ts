import { configureStore } from "@reduxjs/toolkit";

import { playerSlice } from "./features/playerSlice";
import { userlistSlice } from "./features/userListSlice";

export const store = configureStore({
  reducer: {
    player: playerSlice.reducer,
    usersList: userlistSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
