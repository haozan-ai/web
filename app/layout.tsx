import { getLocaleOnServer } from '@/i18n/server'
import { App } from './App'

import './styles/globals.scss'
import './styles/markdown.scss'

const LocaleLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const locale = getLocaleOnServer()
  return (
    <html lang={locale ?? 'zh-Hans'} className="h-full">
      <body className="h-full">
        <div className="overflow-x-auto">
          <div className="w-screen h-screen min-w-[300px]">
            <App>{children}</App>
          </div>
        </div>
      </body>
    </html>
  )
}

export default LocaleLayout
