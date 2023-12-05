import { configureStore } from "@reduxjs/toolkit";

import { playerSlice } from "./features/playerSlice";

export const store = configureStore({
  reducer: {
    player: playerSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
