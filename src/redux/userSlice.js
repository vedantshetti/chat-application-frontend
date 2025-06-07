import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name:'user',
    initialState: {
        authUser: null,
    },
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
        },
        // setOtherUsers: (state, action) => {
        //     state.otherUsers = action.payload;
        // },
        // setSelectedUser: (state, action) => {
        //     state.selectedUser = action.payload;
        // }
    } 
})
export const { setAuthUser } = userSlice.actions;
export default userSlice.reducer;