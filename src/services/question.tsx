import request from './axios'
import type { ResDataType } from './axios'

export const getQuestionService = async (id: string): Promise<ResDataType> => {
  const res = (await request.get(`/api/question/${id}`)) as ResDataType
  return res
}

export const createQuestionService = async (): Promise<ResDataType> => {
  const res = (await request.post(`/api/question`)) as ResDataType
  return res
}

type SearchOptions = {
  keyword: string
  isStar: boolean
  isDelete: boolean
  pageSize: number
  page: number
}

export const getQuestionListService = async (options: Partial<SearchOptions> = {}): Promise<ResDataType> => {
  const res = (await request.get(`/api/question`, { params: options })) as ResDataType
  return res
}

// 更新问卷
export const updateQuestionListService = async (id: string, data: Record<string, any>): Promise<ResDataType> => {
  const res = (await request.patch(`/api/question/${id}`, data)) as ResDataType
  return res
}

// /api/question/duplicate/:id
// 复制问卷
export const duplicateQuestionListService = async (id: string): Promise<ResDataType> => {
  const res = (await request.post(`/api/question/duplicate/${id}`)) as ResDataType
  return res
}

// 更新问卷
export const deleteQuestionsService = async (ids: string[]): Promise<ResDataType> => {
  const res = (await request.delete(`/api/question`, { data: { ids } })) as ResDataType
  return res
}
