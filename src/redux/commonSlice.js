import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "common",
  initialState: {
    visibility:true
  },
  reducers: {
    changeFiltersBarVisibility: (state) => {
      state.visibility = !state.visibility;
    },
  },
});

export const { changeFiltersBarVisibility } = commonSlice.actions;

export default commonSlice.reducer;
