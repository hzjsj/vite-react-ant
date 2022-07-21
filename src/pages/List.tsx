import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Space, Popconfirm, message, Button, Input, Select, Modal, Form, Radio, notification } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';

export const List: React.FC<{}> = ({ }) => {

  console.log(123)
  const url = 'https://hzpc.service.tcloudbase.com/request/v1.0/db_movie'
  const [movData, setMovData] = useState([])
  const fetchData = useCallback(async () => {
    try {

      const res = await fetch(url)
      if (res.ok) {
        const data = await res.json()
        setMovData(data.data)
        console.log(data.data)

      } else {
        throw new Error('数据加载失败啦！')
      }
    } catch (err) {

    } finally {

    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  interface DataType {
    title: string;
    dataIndex: string;
    key: string;
    _id?: string
  }


  const columns: ColumnsType<DataType> = [
    {
      title: '电影名',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '评分',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* <a>编辑</a> */}
          <Button type="primary" size='small'>编辑</Button>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
            <Button type="primary" size='small' danger>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const handleDelete = (key: String) => {
    console.log('key', key)
    const newData = movData.filter(item => item._id !== key);
    setMovData(newData)
    message.success('删除成功!');
  };

  const [visible, setVisible] = useState(false);
  const onCreate = (values: any) => {
    console.log('Received values of form: ', values);
    console.log(99, JSON.stringify(values))
    notification['success']({
      message: 'Notification Title',
      description: JSON.stringify(values)
    });
    setVisible(false);
  };

  type NotificationType = 'success' | 'info' | 'warning' | 'error';

  const openNotificationWithIcon = (type: NotificationType) => {
    notification[type]({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };


  return (
    <div>
      <h3>电影列表</h3>
      <div style={{ margin: '10px 0' }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { setVisible(true) }} >
          新建
        </Button>
        <NewFrom
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
        />
      </div>
      <Table bordered={true} size='middle' dataSource={movData} rowKey={record => record._id} columns={columns} />;
    </div>
  )
}
// 新建表单开始
interface Values {
  title: string;
  description: string;
}

// 新建表单组件
interface NewFroms {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const NewFrom: React.FC<NewFroms> = ({ visible, onCreate, onCancel, }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="添加电影"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input the title of collection!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input type="textarea" />
        </Form.Item>
        <Form.Item name="modifier" className="collection-create-form_last-form-item">
          <Radio.Group>
            <Radio value="public">Public</Radio>
            <Radio value="private">Private</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
}