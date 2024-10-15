import { createSlice } from "@reduxjs/toolkit"
import { authStorageService } from "@/services/storage"

const initialState = {
    username: authStorageService.getUsername(),
    isLogin: authStorageService.getLoginState(),
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsLogin(state, action) {
            state.isLogin = action.payload ?? true
            authStorageService.setLoginState(action.payload ?? true)
            return state
        },
        setUsername(state, action) {
            state.username = action.payload
            authStorageService.setUsername(action.payload)
            return state
        },
        setLoginState(state, action) {
            authStorageService.setLoginState(!!action.payload?.isLogin)
            authStorageService.setUsername(action.payload.username)
            return {
                ...action.payload,
            }
        },
    },
})

export default authSlice.reducer
export const { setIsLogin, setUsername, setLoginState } = authSlice.actions
