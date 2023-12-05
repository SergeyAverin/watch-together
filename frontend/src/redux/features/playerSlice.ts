import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PlayerState {
  isPaused: boolean;
}

const initialState: PlayerState = {
  isPaused: false,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    toggle: (state) => {
      state.isPaused = !state.isPaused;
    },
  },
});

export const { toggle } = playerSlice.actions;

export default playerSlice.reducer;
