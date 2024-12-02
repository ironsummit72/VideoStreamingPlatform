import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: "auth",
    initialState: {
        isUserAuthenticated: false,
        user: null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isUserAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.isUserAuthenticated = false;
        },
    },
});
export const {login,logout}=authSlice.actions;
export default authSlice.reducer