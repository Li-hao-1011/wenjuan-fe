import request from './axios'
import type { ResDataType } from './axios'

export const getUserInfoService = async (): Promise<ResDataType> => {
  const res = (await request.get(`/api/user/info`)) as ResDataType
  return res
}

export const registerService = async (info: {
  username: string
  password: string
  nickname?: string
}): Promise<ResDataType> => {
  const res = (await request.post(`/api/user/register`, {
    ...info,
    nickname: info.nickname || info.username,
  })) as ResDataType
  return res
}

export const loginService = async (info: { username: string; password: string }): Promise<ResDataType> => {
  const res = (await request.post(`/api/user/login`, { ...info })) as ResDataType
  return res
}
