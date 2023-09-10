import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionListService } from '../services/question'
import {
  SEARCH_LIST_PARAM_KEY,
  SEARCH_LIST_PAGE_PARAM_KEY,
  SEARCH_LIST_PAGE_SIZE_PARAM_KEY,
  LIST_PAGE_SIZE,
} from '../constant/index'

type OptionType = {
  isStar: boolean
  isDelete: boolean
}

const useLoadQuestionList = (options: Partial<OptionType>) => {
  const { isStar, isDelete } = options
  const [searchParams] = useSearchParams()

  const { data, loading, error, refresh } = useRequest(
    async () => {
      const keyword = searchParams.get(SEARCH_LIST_PARAM_KEY) || ''
      const page = parseInt(searchParams.get(SEARCH_LIST_PAGE_PARAM_KEY) || '') || 1
      const pageSize = parseInt(searchParams.get(SEARCH_LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE

      const data = await getQuestionListService({ keyword, isStar, isDelete, page, pageSize })
      return data
    },
    {
      refreshDeps: [searchParams],
    },
  )
  return { data, loading, error, refresh }
}

export default useLoadQuestionList
