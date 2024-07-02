import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth_module/authSlice";
import { apiSlice } from "../api/apiSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
		// other reducer example
		// counter: counterReducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(apiSlice.middleware),
});
