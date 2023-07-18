import type { FC } from 'react'
import React from 'react'
import { UserPage } from './UserPage'

const App: FC = () => <UserPage />

export default React.memo(App)