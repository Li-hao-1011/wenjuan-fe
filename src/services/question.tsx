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
}

export const getQuestionListService = async (options: Partial<SearchOptions> = {}): Promise<ResDataType> => {
  const res = (await request.get(`/api/question`, { params: options })) as ResDataType
  return res
}
