import '@babel/polyfill'
import React, { Fragment, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'antd/dist/antd.css'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import Routers from './routes'
import './assets/scss/index.scss'

// ts报错hot时安装 @types/webpack-env
if (module && module.hot) {
  module.hot.accept()
}
const App = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Fragment>
        <Router>
          <Routers />
        </Router>
      </Fragment>
    </ConfigProvider>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
