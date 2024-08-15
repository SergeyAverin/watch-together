import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "./api/authApi";

import { playerSlice } from "./features/playerSlice";
import { userListSlice } from "./features/userListSlice";
import { followSLice } from "./features/followSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    player: playerSlice.reducer,
    usersList: userListSlice.reducer,
    followSLice: followSLice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([authApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
