import { message, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import qs from 'qs';
import React, { useCallback, useEffect, useState } from 'react';

interface DataType {
  name: {
    first: string;
    last: string;
  };
  gender: string;
  email: string;
  login: {
    uuid: string;
  };
}

interface Params {
  pagination?: TablePaginationConfig;
  sorter?: SorterResult<any> | SorterResult<any>[];
  total?: number;
  sortField?: string;
  sortOrder?: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: name => `${name.first} ${name.last}`,
    width: '20%',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
    ],
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];

const column = [
  {
    title: '书名',
    dataIndex: 'title',
    width: '20%',
  },
  {
    title: '描述',
    dataIndex: 'desc',
  },
  {
    title: '作者',
    dataIndex: 'author',
  },
  {
    title: '价格',
    dataIndex: 'price',
  },
  {
    title: '出版日期',
    dataIndex: 'publish_data',
  },
];

export const Book: React.FC = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  });

  const fetchDatas = (params: Params = {}) => {
    setLoading(true);
    fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(params))}`)
      .then(res => res.json())
      .then(({ results }) => {
        setData(results);
        setLoading(false);
        setPagination({
          ...params.pagination,
          total: 200,
          // 200 is mock data, you should read it from server
          // total: data.totalCount,
        });
      });
  };

  const getRandomuserParams = (params: Params) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });

  //https://hzpc-1258873690.ap-shanghai.service.tcloudbase.com/request/v1.0/db_book/?limit=2&skip=3
  const apiUrl = 'https://hzpc-1258873690.ap-shanghai.service.tcloudbase.com/request/v1.0/db_book'

  const fetchData = useCallback(async (params: Params = {}) => {
    const current = params.pagination.current
    const pageSize = params.pagination.pageSize
    console.log(9999, current, pageSize)
    console.log('fetchData中的pagination', params.pagination)
    const parameter = getRandomuserParams(params)
    console.log('parameter', parameter)
    // return pagination
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/?limit=${pageSize}&skip=${(current - 1) * pageSize}`)
      if (res.ok) {
        const data = await res.json()

        setData(data.data)

        setPagination({
          ...params.pagination,
          total: data.total,
          // 200 is mock data, you should read it from server
          // total: data.totalCount,
        });
      } else {
        throw new Error('数据加载失败啦！')
      }
    } catch (err) {
      message.warning(`${err}`);
    } finally {
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    fetchData({ pagination });
  }, []);

  // 分页、排序、筛选变化时触发
  const handleTableChange = (
    newPagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<DataType>,
  ) => {

    fetchData({
      sortField: sorter.field as string,
      sortOrder: sorter.order as string,
      pagination: newPagination,
      ...filters,
    });
  };

  return (
    <Table size='middle'
      columns={column}
      rowKey={record => record._id}
      dataSource={data}
      pagination={pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};
