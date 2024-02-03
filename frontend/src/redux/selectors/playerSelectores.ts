import { RootState } from "@redux/store";

export const sourceSelector = (state: RootState) => state.player.source;
export const isPausedSelector = (state: RootState) => state.player.isPaused;
export const currentTimeSelector = (state: RootState) =>
  state.player.currentTime;
export const durationSelector = (state: RootState) => state.player.duration;
export const isInteractedSelector = (state: RootState) =>
  state.player.isInteracted;
