import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserState } from './userReducer'

export type StoreType = { user: UserState }

export default configureStore({
  reducer: {
    user: userReducer,
  },
})
