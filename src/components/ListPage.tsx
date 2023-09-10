import { FC, useEffect, useState } from 'react'
import { Pagination } from 'antd'
import type { PaginationProps } from 'antd'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { LIST_PAGE_SIZE, SEARCH_LIST_PAGE_PARAM_KEY, SEARCH_LIST_PAGE_SIZE_PARAM_KEY } from '../constant/index'

type PropsType = {
  total: number
}

const ListPage: FC<PropsType> = (props) => {
  const { total = 10 } = props
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)
  const [searchParams] = useSearchParams()
  const { pathname } = useLocation()
  const nav = useNavigate()
  // 改变 page、pageSize
  const onChange: PaginationProps['onChange'] = (page, pageSize) => {
    console.log('Page: ', page, pageSize)
    searchParams.set(SEARCH_LIST_PAGE_PARAM_KEY, `${page}`)
    searchParams.set(SEARCH_LIST_PAGE_SIZE_PARAM_KEY, `${pageSize}`)
    nav({
      pathname,
      search: searchParams.toString(),
    })
  }

  // 从URL中设置 page、pageSize
  useEffect(() => {
    const page = parseInt(searchParams.get(SEARCH_LIST_PAGE_PARAM_KEY) || '') || 1
    const pageSize = parseInt(searchParams.get(SEARCH_LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
    setCurrent(page)
    setPageSize(pageSize)
  }, [searchParams])

  return <Pagination current={current} total={total} pageSize={pageSize} onChange={onChange} />
}

export default ListPage
