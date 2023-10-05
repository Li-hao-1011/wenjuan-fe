import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type PageInfoType = {
  title: string
  desc?: string
  js?: string
  css?: string
  isPublished?: boolean
}

const INIT_PAGE_INFO: PageInfoType = {
  title: '',
  desc: '',
  js: '',
  css: '',
}

const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: INIT_PAGE_INFO,
  reducers: {
    resetPageInfo(state: PageInfoType, action: PayloadAction<PageInfoType>) {
      return action.payload
    },
    changePageTitle(state: PageInfoType, action: PayloadAction<string>) {
      return { ...state, title: action.payload }
    },
  },
})

export const { resetPageInfo, changePageTitle } = pageInfoSlice.actions

export default pageInfoSlice.reducer
