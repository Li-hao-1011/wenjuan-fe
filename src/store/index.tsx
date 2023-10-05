import { configureStore } from '@reduxjs/toolkit'
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'
import userReducer, { UserState } from './userReducer'
import componentsReducer, { ComponentsStoreType } from './questionReducer/index'
import pageInfoReducer, { PageInfoType } from './pageInfoReducer'

export type StoreType = { user: UserState; components: StateWithHistory<ComponentsStoreType>; pageInfo: PageInfoType }

export default configureStore({
  reducer: {
    user: userReducer,
    // 使用 redux-undo，增加撤销等功能
    components: undoable(componentsReducer, {
      limit: 20,
      filter: excludeAction([
        'components/resetComponents',
        'components/changeSelectedId',
        'components/selectPrevComponent',
        'components/selectNextComponent',
        'components/copySelectedComponent',
      ]),
    }),
    pageInfo: pageInfoReducer,
  },
})
