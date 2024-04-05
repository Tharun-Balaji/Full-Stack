import { createSlice } from "@reduxjs/toolkit";


const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    loader: false,
  },
  reducers: {
    ShowLoading: (state) => {
      state.loading = true;
    },
    HideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { ShowLoading, HideLoading } = loaderSlice.actions;
export default loaderSlice.reducer;