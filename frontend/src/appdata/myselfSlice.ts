import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  me: {
    id: number;
    username: string;
    email: string;
    provider: string;
    blocked: boolean;
    confirmed: boolean;
    createdAt: string;
    updatedAt: string;
  } | null;
  token: string | null;
}

const initialState: UserState = {
  me: null,
  token: null,
};

const myselfSlice = createSlice({
  name: "me",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: UserState["me"]; token: string }>
    ) => {
      state.me = action.payload.user;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.me = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, clearUser } = myselfSlice.actions;

export default myselfSlice.reducer;
