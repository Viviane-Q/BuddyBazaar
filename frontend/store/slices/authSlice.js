import { createSlice } from "@reduxjs/toolkit"
import User from "../../entities/User"

const initialUser = new User('', '');

const authSlice = createSlice({
    name: "auth",
    initialState: {
        ...initialUser,
        token: ''
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload
        },
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        }
    },
})


export const { setToken, setName, setEmail } = authSlice.actions

export default authSlice.reducer