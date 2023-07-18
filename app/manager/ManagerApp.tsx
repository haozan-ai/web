'use client';

import type { FC, PropsWithChildren } from 'react'
import React from 'react'
import type { MenuProps } from 'antd';
import { Layout, Menu } from "antd";
import { DesktopOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Content, Header } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('用户管理', 'user', <UserOutlined rev />),
    getItem('应用管理', 'apps', <DesktopOutlined rev />),
]

const ManagerApp: FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter()
    return <Layout>
        <Header>
            <Menu
                theme="dark"
                mode="horizontal"
                items={items}
                onClick={({ key }) => {
                    router.push(`/manager/${key}`)
                }}
            />
        </Header>
        <Content style={{ padding: '0 50px' }}>
            {children}
        </Content>

    </Layout>

}

export default ManagerApp