import { createSlice } from "@reduxjs/toolkit"
import User from "../../entities/User"

const initialUser = new User(0, '', '', '');

const authSlice = createSlice({
    name: "auth",
    initialState: {
        ...initialUser,
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
        },
        setUserId: (state, action) => {
            state.id = action.payload
        }
    },
})


export const { setToken, setName, setEmail, setUserId } = authSlice.actions

export default authSlice.reducer