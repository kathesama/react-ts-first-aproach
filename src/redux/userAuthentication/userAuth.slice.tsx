import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isUserAuthenticated: false,
};

const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        login(state) {
            return {
                ...state,
                isUserAuthenticated: true,
            };
        },
        logout(state) {
            return {
                ...state,
                isUserAuthenticated: false,
            };
        },
    },
});

export const { login, logout } = userAuthSlice.actions;

export default userAuthSlice.reducer;
