import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { produce } from 'immer'
import clonedeep from 'lodash.clonedeep'
import { ComponentPropsType } from '../../components/QuestionComponents/index'
import { getNextSelectedId, insertNewComponent } from './utils'
import { generateRandomStr } from '../../utils/randomStr'

export type QuestionInfoProps = {
  fe_id: string
  type: string
  title: string
  props: ComponentPropsType
  isHidden: boolean
  isLocked: boolean
}

export type ComponentsStoreType = {
  selectedId: string
  componentList: QuestionInfoProps[]
  // 其他扩展
  copiedComponent: QuestionInfoProps | null
}

const INIT_STORE: ComponentsStoreType = {
  selectedId: '',
  componentList: [],
  copiedComponent: null,
}

const questionSlice = createSlice({
  name: 'components',
  initialState: INIT_STORE,
  reducers: {
    // 设置组件列表
    resetComponents: (state: ComponentsStoreType, action: PayloadAction<ComponentsStoreType>) => {
      return action.payload
    },
    /* 
      resetComponents: produce((state: ComponentsStoreType, action: PayloadAction<ComponentsStoreType>) => {
      state.componentList = action.payload.componentList
    }),
    */
    // 切换选中
    changeSelectedId: (state: ComponentsStoreType, action: PayloadAction<string>) => {
      // draft.selectedId = action.payload
      // return produce((state = draft, action) => {})
      return produce(state, (_draft) => {
        state.selectedId = action.payload
      })
    },
    /*    changeSelectedId_2: (state: ComponentsStoreType, action: PayloadAction<string>) => {
      // state.selectedId = action.payload
      return { ...state, selectedId: action.payload }
    }, */
    /* 
    (draft: ComponentsStoreType, action: PayloadAction<string>) => {
      console.log(draft)
      // draft.selectedId = action.payload
    }
    */
    // 添加组件
    addComponent: (state: ComponentsStoreType, action: PayloadAction<QuestionInfoProps>) => {
      return produce(state, (_draft) => {
        const newComponent = action.payload
        insertNewComponent(state, newComponent)
      })
    },

    // 修改属性props
    updateComponentProps: (
      state: ComponentsStoreType,
      action: PayloadAction<{
        fe_id: string
        newProps: ComponentPropsType
      }>,
    ) => {
      return produce(state, (_draft) => {
        const { fe_id, newProps } = action.payload
        state.componentList = state.componentList.map((it) => {
          if (it.fe_id === fe_id) {
            return { ...it, props: newProps }
          }
          return { ...it }
        })
      })
    },

    // 删除组件
    removeSelectedComponent: (state: ComponentsStoreType) => {
      return produce(state, () => {
        const { componentList, selectedId: removeId } = state
        state.selectedId = getNextSelectedId(removeId, componentList)
        const index = componentList.findIndex((it) => it.fe_id === removeId)
        if (index < 0) return
        state.componentList.splice(index, 1)
      })
    },

    // 隐藏组件
    changeComponentHidden: (
      state: ComponentsStoreType,
      action: PayloadAction<{
        fe_id: string
        isHidden: boolean
      }>,
    ) => {
      return produce(state, (_draft) => {
        const { fe_id, isHidden } = action.payload
        const { componentList } = state
        const index = state.componentList.findIndex((it) => it.fe_id === fe_id)

        if (index >= 0) {
          if (isHidden) {
            // 隐藏
            state.selectedId = getNextSelectedId(fe_id, componentList)
          } else {
            // 显示
            state.selectedId = fe_id
          }
          state.componentList[index].isHidden = isHidden
        }
      })
    },

    // 锁定/解锁组件
    toggleComponentLocked: (
      state: ComponentsStoreType,
      action: PayloadAction<{
        fe_id: string
      }>,
    ) => {
      return produce(state, (_draft) => {
        const { fe_id } = action.payload
        const currentComp = state.componentList.find((it) => it.fe_id === fe_id)
        if (currentComp) {
          currentComp.isLocked = !currentComp.isLocked
        }
      })
    },

    // 拷贝组件
    copySelectedComponent: (state: ComponentsStoreType) => {
      return produce(state, (_draft) => {
        const { selectedId, componentList } = state
        const currentComp = componentList.find((it) => it.fe_id === selectedId)
        if (currentComp) {
          state.copiedComponent = clonedeep(currentComp)
        }
      })
    },

    // 粘贴组件
    pasteCopiedComponent: (state: ComponentsStoreType) => {
      return produce(state, () => {
        const { copiedComponent } = state
        if (copiedComponent !== null) {
          copiedComponent.fe_id = generateRandomStr()
          insertNewComponent(state, copiedComponent)
        }
      })
    },

    // 选中上一个
    selectPrevComponent: (state: ComponentsStoreType) => {
      const { selectedId, componentList } = state
      const index = componentList.findIndex((it) => it.fe_id === selectedId)
      if (index <= 0) return

      state.selectedId = componentList[index - 1].fe_id
    },
    // 选中下一个
    selectNextComponent: (state: ComponentsStoreType) => {
      const { selectedId, componentList } = state
      const index = componentList.findIndex((it) => it.fe_id === selectedId)
      if (index < 0 || index === componentList.length - 1) return

      state.selectedId = componentList[index + 1].fe_id
    },

    // 修改组件标题
    changeComponentTitle: (state: ComponentsStoreType, action: PayloadAction<{ fe_id: string; title: string }>) => {
      return produce(state, (_draft) => {
        const { fe_id, title } = action.payload
        const curComp = state.componentList.find((it) => it.fe_id === fe_id)
        if (curComp) curComp.title = title
      })
    },
  },
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  updateComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
} = questionSlice.actions

export default questionSlice.reducer
