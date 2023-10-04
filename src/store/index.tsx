import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserState } from './userReducer'
import componentsReducer, { ComponentsStoreType } from './questionReducer/index'
import pageInfoReducer, { PageInfoType } from './pageInfoReducer'

export type StoreType = { user: UserState; components: ComponentsStoreType; pageInfo: PageInfoType }

export default configureStore({
  reducer: {
    user: userReducer,
    components: componentsReducer,
    pageInfo: pageInfoReducer,
  },
})
