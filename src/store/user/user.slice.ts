import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import type {RootState} from '../store'
import {IResponseLoginData} from '../../types/types'

interface userState {
    user: IResponseLoginData | null
    isAuth: boolean
}

const initialState: userState = {
    user: null,
    isAuth: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IResponseLoginData>) => {
            state.user = action.payload
            state.isAuth = true
        },
        logout: (state) => {
            state.user = null
            state.isAuth = false
        },
    },
})

export const {login, logout} = userSlice.actions

export const selectCount = (state: RootState) => state.user

export default userSlice.reducer