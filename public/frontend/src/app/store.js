import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import pageDataReducer from '../features/pageData/pageDataSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // todo: todoReducer,
    pageData: pageDataReducer,
    // category: categoryReducer,
  }
})