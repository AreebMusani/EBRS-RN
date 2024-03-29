import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state interface
interface UserState {
  name: string;
}

// Define the initial state
const initialState: UserState = {
  name: "",
};

// Create a slice with a name and an initial state
export const userSlice = createSlice({
  name: "user", // name for the slice
  initialState, // initial state for the slice

  // Define reducers that can update the state
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },

  // Define extra reducers that listen to actions from userActions.js
  // and update the state
  // extraReducers: (builder) => {
  //   builder.addCase(saveUserName.fulfilled, (state, action) => {
  //     state.name = action.payload;
  //   });
  //   builder.addCase(getUserInfo.fulfilled, (state, action) => {
  //     state.userInfo = action.payload;
  //   });
  //   builder.addCase(deleteUser.fulfilled, (state, action) => {
  //     state.name = "";
  //     state.userInfo = {};
  //   });
  // },
});

// Export the action creators generated by createSlice
export const { setName } = userSlice.actions;

// Export the reducer generated by createSlice
export default userSlice.reducer;
