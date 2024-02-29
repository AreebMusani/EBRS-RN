import { createAsyncThunk } from "@reduxjs/toolkit";

// Define the type for the user name
type UserName = string;

// Define the type for the user info object
interface UserInfo {
  // Define the properties of the user info object
  // For example: name: string;
}

// Thunk to save the user's name
export const saveUserName = createAsyncThunk<UserName, UserName>(
  "user/saveUserName",
  async (name: UserName) => {
    // Here you can make your API call to save the user's name
    // For the sake of simplicity, let's just return the name as payload
    return name;
  }
);

// Thunk to get the user's info
export const getUserInfo = createAsyncThunk<UserInfo, void>(
  "user/getUserInfo",
  async () => {
    // Here you can make your API call to get the user's info
    // For the sake of simplicity, let's just return an empty object as payload
    return {};
  }
);
