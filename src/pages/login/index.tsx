import React, { Component, lazy, Suspense } from 'react'
import { Button } from 'antd'
import axios from 'axios'
import Demo2 from '@/components/Demo2'
import Demo1 from '@/components/Demo1'
import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')
// 装饰器为,组件添加age属性
function addAge(Target: Function) {
  Target.prototype.age = 111
}
// 使用装饰圈
@addAge
export default class index extends Component {
  age?: number
  componentDidMount() {
    // axios.get('/api/v1/getUser').then((res) => { console.log(res)}, (err) => {
    //   console.log(err)
    // })
    // console.log(import('axios'))
    console.log('zyp----')
  }

  render() {
    return (
      <div id="login">
        1112{moment().subtract(6, 'days').calendar()}
        <Demo1 />
        {/* <Button onClick={Prejquery}>jquery</Button> */}
        login Page<Button type="primary">login</Button>
        <h2>我是类组件---{this.age}</h2>
        <img src={require('../../assets/imgs/logo192.png')}></img>
      </div>
    )
  }
}

