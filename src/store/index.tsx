import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserState } from './userReducer'
import componentsReducer, { ComponentsStoreType } from './questionReducer/index'

export type StoreType = { user: UserState; components: ComponentsStoreType }

export default configureStore({
  reducer: {
    user: userReducer,
    components: componentsReducer,
  },
})
