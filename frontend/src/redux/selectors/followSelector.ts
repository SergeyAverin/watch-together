import { RootState } from "@redux/store";

export const isPanelShowSelector = (state: RootState) =>
  state.followSLice.isPanelShow;
