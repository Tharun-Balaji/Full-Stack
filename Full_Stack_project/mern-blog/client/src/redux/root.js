import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import themeReducer from './theme/themeSlice';

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer
});

export default rootReducer;