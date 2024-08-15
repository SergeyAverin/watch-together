import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IFollowState {
  isPanelShow: boolean;
}

const initialState: IFollowState = {
  isPanelShow: false,
};

export const followSLice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    setIsFollowPanelShow(state, actions: PayloadAction<boolean>) {
      state.isPanelShow = actions.payload;
    },
  },
});

export const { setIsFollowPanelShow } = followSLice.actions;
