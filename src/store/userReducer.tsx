import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type UserState = {
  username: string
  nickname: string
}

const INIT_USER_STATE: UserState = {
  username: '',
  nickname: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState: INIT_USER_STATE,
  reducers: {
    loginReducer(state, action: PayloadAction<UserState>) {
      return { ...state, ...action.payload }
    },
    logoutReducer() {
      return { ...INIT_USER_STATE }
    },
  },
})

export const { loginReducer, logoutReducer } = userSlice.actions

export default userSlice.reducer
