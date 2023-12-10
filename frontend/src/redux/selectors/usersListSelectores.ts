import { RootState } from "@redux/store";

export const usersCountSelector = (state: RootState) =>
  state.usersList.userCount;
