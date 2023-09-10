import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionListService } from '../services/question'
import { SEARCH_LIST_PARAM_KEY } from '../constant/index'

type OptionType = {
  isStar: boolean
  isDelete: boolean
}

const useLoadQuestionList = (options: Partial<OptionType>) => {
  const { isStar, isDelete } = options
  const [searchParams] = useSearchParams()

  const { data, loading, error } = useRequest(
    async () => {
      const keyword = searchParams.get(SEARCH_LIST_PARAM_KEY) || ''

      const data = await getQuestionListService({ keyword, isStar, isDelete })
      return data
    },
    {
      refreshDeps: [searchParams],
    },
  )
  return { data, loading, error }
}

export default useLoadQuestionList
