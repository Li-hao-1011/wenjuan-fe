import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { getQuestionService } from '../services/question'
import { QuestionInfoProps, resetComponents } from '../store/questionReducer/index'
import { resetPageInfo } from '../store/pageInfoReducer'

export const useLoadQuestionData = () => {
  const { id = '' } = useParams()
  const dispatch = useDispatch()

  const {
    data = {},
    loading,
    error,
    run,
  } = useRequest(
    async (id: string) => {
      if (!id) {
        throw new Error('没有问卷')
      }
      const res = await getQuestionService(id)
      return res
    },
    {
      manual: true,
    },
  )

  useEffect(() => {
    const {
      title = '',
      componentList = [],
      desc = '',
      js = '',
      css = '',
    } = data as { componentList: QuestionInfoProps[]; title: string; desc: string; js: string; css: string }
    let selectedId = ''
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id
    }
    // 存储 componentList 到 Redux
    dispatch(
      resetComponents({
        selectedId,
        componentList,
        copiedComponent: null,
      }),
    )
    // 存储PageInfo
    dispatch(resetPageInfo({ title, desc, js, css }))
  }, [data])

  useEffect(() => {
    run(id)
  }, [id])

  //   const request = async () => {
  //     const res = await getQuestionService(id)
  //     return res
  //   }
  //   const { data, error, loading } = useRequest(request)
  return { error, loading }
}

export default useLoadQuestionData
