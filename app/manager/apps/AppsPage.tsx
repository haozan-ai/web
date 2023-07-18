'use client';

import type { FC } from 'react'
import React, { useState } from 'react'
import { Form, Input, Table, Space, Button, Drawer, Select } from "antd";
import { useRequest } from 'ahooks';
import { request } from '@/lib/request';

export const AppsPage: FC = () => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const { data, loading, refresh } = useRequest(() => request.get('/api/apps'), {})
    const submit = useRequest(async (data: any) => {
        if (data.id) {
            await request.put(`/api/apps/${data.id}`, data)
            return
        }
        await request.post('/api/apps', data)
    }, {
        manual: true,
        onSuccess() {
            onClose()
            refresh()
        }
    })

    const addApp = () => {
        form.resetFields()
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    return <div className='w-full p-6 flex flex-col'>
        <div className='w-full flex items-center justify-between py-4'>
            <div>应用列表</div>
            <Space size="middle">
                <Button onClick={refresh}>刷新</Button>
                <Button type="primary" onClick={addApp}>添加应用</Button>
            </Space>
        </div>
        <Table
            loading={loading}
            dataSource={data?.data?.list}
            columns={[
                {
                    title: '应用名',
                    dataIndex: 'title',
                    key: 'title',
                },
                {
                    title: '应用描述',
                    dataIndex: 'description',
                    key: 'description',
                },
                {
                    title: '应用类型',
                    dataIndex: 'APP_TYPE',
                    key: 'type',
                    render: (_, record) => record.APP_TYPE === 'conversation' ? '对话型应用' : '文本生成应用'
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
            title={form.getFieldValue('id') ? '编辑应用' : '添加应用'}
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
                <Form.Item label="应用名" name="title">
                    <Input />
                </Form.Item>
                <Form.Item label="应用描述" name="description">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item label="应用类型" name="APP_TYPE">
                    <Select
                        options={[
                            { value: 'conversation', label: '对话型应用' },
                            { value: 'text', label: '文本生成应用' }
                        ]}
                    />
                </Form.Item>
                <Form.Item label="APP_ID" name="APP_ID" >
                    <Input />
                </Form.Item>
                <Form.Item label="API_KEY" name="API_KEY" >
                    <Input />
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