import { createSlice } from "@reduxjs/toolkit"
import User from "../../entities/User"
import { registerUser } from "../thunks/authThunk";

const initialUser = new User('', '', '');

const authSlice = createSlice({
    name: "auth",
    initialState: {
        ...initialUser,
    },
    reducers: {
        setAuthToken: (state, action) => {
            state.token = action.payload
        },
        setName: (state, action) => {
            state.name = action.payload
        },
        setEmail: (state, action) => {
            state.email = action.payload
        },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(registerUser.fulfilled, (state, action) => {
    //         console.log(action.payload)
    //         state.token = action.payload.token
    //     })
    // }
})


export const { setAuthToken, setName, setEmail } = authSlice.actions

export default authSlice.reducer