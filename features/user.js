import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      primaryEmail: "",
      secondaryEmail: "",
      isPrimary: true,
      isSet: false,
    },
  },
  reducers: {
    setMail: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setMail } = userSlice.actions;
export default userSlice.reducer;
