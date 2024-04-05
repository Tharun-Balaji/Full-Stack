import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./loaderSlice";
import userReducer from "./userSlice";


const store = configureStore({
  reducers: {
    loaders: loaderReducer,
    users: userReducer,
  },
});

export default store;