import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PlayerState {
  isPaused: boolean;
  currentTime: number;
  duration: number;
  source: string | null;
  isInteracted: boolean;
}

const initialState: PlayerState = {
  isPaused: false,
  currentTime: 0,
  duration: 0,
  source: null,
  isInteracted: false,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setIsPaused: (state, actions: PayloadAction<boolean>) => {
      state.isPaused = actions.payload;
    },
    setVideoSource: (state, action: PayloadAction<string>) => {
      state.source = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setIsInteracted: (state, action: PayloadAction<boolean>) => {
      state.isInteracted = action.payload;
    },
  },
});

export const {
  setIsPaused,
  setVideoSource,
  setCurrentTime,
  setDuration,
  setIsInteracted,
} = playerSlice.actions;
