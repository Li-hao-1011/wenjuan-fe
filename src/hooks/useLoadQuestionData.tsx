import { useParams } from 'react-router-dom'
import { getQuestionService } from '../services/question'
import { useRequest } from 'ahooks'

const useLoadQuestionData = () => {
  const { id = '' } = useParams()
  //   const [loading, setLoading] = useState(true)
  //   const [questionData, setQuestionData] = useState<Record<string, any>>()

  //   useEffect(() => {
  //   const request = async () => {
  // const res = await getQuestionService(id)
  // setQuestionData(res)
  // console.log('res', res)
  // setLoading(false)
  // return res
  // }
  //     request()
  //   }, [])
  //   return { loading, questionData }
  const request = async () => {
    const res = await getQuestionService(id)
    return res
  }
  const { data, error, loading } = useRequest(request)
  return { questionData: data, error, loading }
}

export default useLoadQuestionData
