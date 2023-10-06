import { FC, useState } from 'react'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { Table, Typography, Pagination } from 'antd'
import { getQuestionStatListService } from '../../../services/stat'
import { useGetComponentsInfo } from '../../../hooks'
import { STAT_PAGE_SIZE } from '../../../constant'

type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (id: string) => void
}

const { Title } = Typography

const PageStat: FC<PropsType> = (props) => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props

  const { id = '' } = useParams()
  const [total, setTotal] = useState(0)
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE)

  // 获取数据
  const { loading } = useRequest(
    async () => {
      const res = await getQuestionStatListService(id, { page, pageSize })
      return res
    },
    {
      refreshDeps: [id, page, pageSize],
      onSuccess(res) {
        const { total, list } = res
        setTotal(total)
        setList(list)
      },
    },
  )

  const { componentList } = useGetComponentsInfo()
  const columns = componentList
    .filter((it) => !it.isHidden)
    .map((it) => {
      const { fe_id, title, props, type } = it
      const colTitle = props?.title ?? title
      return {
        dataIndex: fe_id,
        // title: props?.title ?? title,
        title: (
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setSelectedComponentId(fe_id)
              setSelectedComponentType(type)
            }}>
            <span style={{ color: fe_id === selectedComponentId ? '#1890ff' : 'inherit' }}>{colTitle}</span>
          </div>
        ),
      }
    })

  const TableElem = (
    <>
      <Table columns={columns} dataSource={list} pagination={false} loading={loading} rowKey="_id"></Table>
      <div style={{ marginTop: '18px', textAlign: 'end' }}>
        <Pagination
          total={total}
          current={page}
          pageSize={pageSize}
          onChange={(page, size) => {
            setPage(page)
            setPageSize(size)
          }}
          onShowSizeChange={(page, size) => {
            setPage(page)
            setPageSize(size)
          }}
        />
      </div>
    </>
  )
  return (
    <div>
      <Title level={3}>{`答卷数量: ${!loading && total}`}</Title>
      {/* {loading && <Spin />} */}
      {TableElem}
    </div>
  )
}

export default PageStat
