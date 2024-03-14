"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeLanguage(state, action) {
      state.value = action.payload;
    },
  },
});

export default languageSlice.reducer;
export const { changeLanguage } = languageSlice.actions;
