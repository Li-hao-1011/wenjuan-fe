import request from './axios'
import type { ResDataType } from './axios'

// 获取问卷统计数据
export const getQuestionStatListService = async (
  questionId: string,
  options: { page: number; pageSize: number },
): Promise<ResDataType> => {
  const data = (await request.get(`/api/stat/${questionId}`, { params: options })) as ResDataType
  return data
}

// 获取统计数据
export const getComponentStatDataService = async (questionId: string, componentId: string): Promise<ResDataType> => {
  const res = (await request.get(`/api/stat/${questionId}/${componentId}`)) as ResDataType
  return res
}
