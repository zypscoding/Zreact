import React, { Component } from 'react'
import { Button } from 'antd'
export default class index extends Component {
  render() {
    return (
      <div id='login'>
        login Page<Button type="primary">login</Button>
        <img src={require('../../assets/imgs/logo192.png')}></img>
      </div>
    )
  }
}
