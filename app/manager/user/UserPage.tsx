'use client';

import type { FC } from 'react'
import React, { useState } from 'react'
import { Form, Input, Table, Space, Button, Drawer, Switch } from "antd";
import { useRequest } from 'ahooks';
import { request } from '@/lib/request';

export const UserPage: FC = () => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const { data, loading, refresh } = useRequest(() => request.get('/api/users'), {})
    const submit = useRequest(async (data: any) => {
        if (data.id) {
            await request.put(`/api/users/${data.id}`, data)
            return
        }
        await request.post('/api/users', data)
    }, {
        manual: true,
        onSuccess() {
            onClose()
            refresh()
        }
    })

    const addUser = () => {
        form.resetFields()
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    return <div className='w-full p-6 flex flex-col'>
        <div className='w-full flex items-center justify-between py-4'>
            <div>用户列表</div>
            <Space size="middle">
                <Button onClick={refresh}>刷新</Button>
                <Button type="primary" onClick={addUser}>添加用户</Button>
            </Space>
        </div>
        <Table
            loading={loading}
            dataSource={data?.data?.list}
            columns={[
                {
                    title: '用户名',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '手机号',
                    dataIndex: 'phone',
                    key: 'phone',
                },
                {
                    title: '管理员',
                    dataIndex: 'isAdmin',
                    key: 'isAdmin',
                    render: (_, record) => record.isAdmin ? '是' : '否'
                },
                {
                    title: '是否启用',
                    dataIndex: 'enable',
                    key: 'enable',
                    render: (_, record) => record.enable ? '启用' : '禁用'
                },
                {
                    title: 'Action',
                    key: 'action',
                    render: (_, record) => (
                        <Space size="middle">
                            <Button
                                type="link"
                                onClick={() => {
                                    form.setFieldsValue(record)
                                    setOpen(true);
                                }}>
                                编辑
                            </Button>
                            {record.enable ? <Button type="link">禁用</Button> : <Button type="link">禁用</Button>}
                        </Space>
                    ),
                },
            ]}
        />
        <Drawer
            title={form.getFieldValue('id') ? '编辑用户' : '添加用户'}
            placement="right"
            onClose={onClose}
            open={open}>
            <Form
                layout="vertical"
                form={form}
                onFinish={values => submit.run(values)}
            >
                <Form.Item hidden name="id">
                    <Input />
                </Form.Item>
                <Form.Item label="手机号" name="phone">
                    <Input />
                </Form.Item>
                <Form.Item label="用户名" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="是否是管理员" name="isAdmin" valuePropName="checked">
                    <Switch />
                </Form.Item>
                <Form.Item>
                    <Button
                        loading={submit.loading}
                        type="primary"
                        htmlType="submit"
                    >
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    </div>
}