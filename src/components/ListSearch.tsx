import { ChangeEvent, FC, useEffect, useState } from 'react'
import { Input } from 'antd'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { SEARCH_LIST_PARAM_KEY } from '../constant/index'

const { Search } = Input

const ListSearch: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  useEffect(() => {
    // 地址栏发生变化就执行
    console.log('searchParams', `SEARCH_LIST_PARAM_KEY ==> ${searchParams.get(SEARCH_LIST_PARAM_KEY)}`)
    const keyword = searchParams.get(SEARCH_LIST_PARAM_KEY) || ''
    setSearchText(keyword)
  }, [searchParams])

  const onSearch = (value: string) => {
    console.log('onSearch', value, pathname)
    nav({
      pathname,
      search: `${SEARCH_LIST_PARAM_KEY}=${value}`,
    })
  }

  const [searchText, setSearchText] = useState<string>('')
  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }
  return (
    <>
      {/* <Search placeholder="请输入关键字" /> */}
      <Search
        style={{ width: '300px' }}
        placeholder="请输入关键字"
        value={searchText}
        onChange={handleSearchTextChange}
        allowClear
        size="large"
        onSearch={onSearch}
      />
    </>
  )
}

export default ListSearch
