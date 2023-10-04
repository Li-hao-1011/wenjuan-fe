import { ComponentsStoreType, QuestionInfoProps } from './index'

/**
 * 获取下一个选中的组件id
 * @param fe_id
 * @param componentList
 * @returns
 */
export const getNextSelectedId = (fe_id: string, componentList: QuestionInfoProps[]) => {
  const visibleList = componentList.filter((it) => !it.isHidden)
  const index = visibleList.findIndex((it) => it.fe_id === fe_id)
  if (index < 0) {
    return ''
  }

  const length = visibleList.length
  if (length <= 1) {
    return ''
  }
  if (index + 1 === length) {
    // 最后一个
    return visibleList[index - 1].fe_id
  } else {
    return visibleList[index + 1].fe_id
  }
}

/**
 * 插入新组件
 * @param draft state
 * @param newComponent 行组件
 */
export const insertNewComponent = (draft: ComponentsStoreType, newComponent: QuestionInfoProps) => {
  const { selectedId, componentList } = draft
  const index = componentList.findIndex((it) => it.fe_id === selectedId)
  if (index < 0) {
    // 末尾添加
    draft.componentList.push(newComponent)
  } else {
    //
    draft.componentList.splice(index + 1, 0, newComponent)
  }
  draft.selectedId = newComponent.fe_id
}
