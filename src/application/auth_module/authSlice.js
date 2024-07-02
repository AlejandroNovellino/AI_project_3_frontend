import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { createSelector } from "reselect";

const initialState = {
	token: null,
	id: "",
	email: "",
	username: "",
};

const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		logOut(state) {
			state.token = null;
			state.id = "";
			state.email = "";
			state.username = "";
		},
	},
	extraReducers: builder => {
		builder
			.addMatcher(
				apiSlice.endpoints.login.matchFulfilled,
				(state, { payload }) => {
					console.log(`🚀 ~ payload:`, payload);
					let result = payload.result;
					state.token = result.token;
					state.id = result.usuario.id;
					state.email = result.usuario.email;
					state.username = result.usuario.userName;
				}
			)
			.addMatcher(
				apiSlice.endpoints.signIn.matchFulfilled,
				(state, { payload }) => {
					console.log(`🚀 ~ payload:`, payload);
					let result = payload.result;
					state.token = result.token;
					state.id = result.usuario.id;
					state.email = result.usuario.email;
					state.username = result.usuario.userName;
				}
			);
	},
});

// Reducer for logout function
export const { logOut } = authSlice.actions;

// Selector for current user
const selectUser = state => state.auth;

export const selectCurrentUser = createSelector([selectUser], user => {
	// Logic to filter or transform products based on user
	return {
		token: user.token,
		id: user.id,
		email: user.email,
		username: user.username,
	};
});

// Export the reducer
export default authSlice.reducer;
