import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IUserslistState {
  userCount: number;
}

const initialState: IUserslistState = {
  userCount: 0,
};

export const userlistSlice = createSlice({
  name: "userlist",
  initialState,
  reducers: {
    setUsersCount: (state, actions: PayloadAction<number>) => {
      state.userCount = actions.payload;
    },
  },
});

export const { setUsersCount } = userlistSlice.actions;
