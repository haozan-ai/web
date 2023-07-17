'use client'

import { PropsWithChildren, FC, useMemo } from 'react'
import {
    legacyLogicalPropertiesTransformer,
    StyleProvider,
} from '@ant-design/cssinjs';
import { ConfigProvider, ThemeConfig } from 'antd';


const prefixCls = 'code_ui';
const iconPrefixCls = 'code_ui_icon';
export const App: FC<PropsWithChildren> = ({ children }) => {
    const themeConfig = useMemo(() => {
        const themeConfig: ThemeConfig = {
            hashed: false,
        }
        return themeConfig
    }, [])
    return <StyleProvider
        ssrInline
        hashPriority="high"
        transformers={[legacyLogicalPropertiesTransformer]}
    >
        <ConfigProvider {...{ prefixCls, iconPrefixCls }} theme={themeConfig}>
            {children}
        </ConfigProvider>
    </StyleProvider>
}