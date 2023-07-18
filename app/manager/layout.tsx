import type { FC, PropsWithChildren } from 'react'
import React from 'react'
import ManagerApp from './ManagerApp'

const App: FC<PropsWithChildren> = ({ children }) => <ManagerApp >{children}</ManagerApp>

export default React.memo(App)