import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userData: any;
  userResponse: any;
}

interface userData {
  name: string;
  email: string;
  phoneNo?: string;
  age?: string;
  gender?: string;
}

const initialState: UserState = {
  userData: {
    name: "",
    email: "",
  },
  userResponse: [
    {
      question: "question 1",
      answer: ["this is ans 1", "this is ans 2"],
      type: "singleSelection",
    },
  ],
};

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<Partial<UserData>>) => {
      state.userData = { ...state.userData, ...action.payload };
    },
    clearUserData: (state) => {
      state.userData = { name: "", email: "" };
    },
    setUserResponse: (state, action: PayloadAction<any>) => {
      state.userResponse = action.payload;
    },
    clearUserResponse: (state) => {
      state.userResponse = {};
    },
  },
});

export const {
  setUserData,
  clearUserData,
  setUserResponse,
  clearUserResponse,
} = userSlice.actions;
export default userSlice.reducer;
