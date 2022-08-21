import React, { Fragment, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Routers from './routes'
import 'antd/dist/antd.css'
import moment from 'moment';
import 'moment/locale/zh-cn';
import './assets/scss/index.scss';
// import '@babel/polyfill' //如果需要使用ES6/7中对象原型提供的新方法,该模块需要在使用新方法的地方直接引入
moment.locale('zh-cn');

const App = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Fragment>
        <BrowserRouter>
            <Routers />
        </BrowserRouter>
      </Fragment>
    </ConfigProvider>
  )
};

createRoot(document.getElementById('root')!).render(<App />,);
