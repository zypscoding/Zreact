import React, { Component } from 'react'
import { Button } from 'antd'
import axios from 'axios'
export default class index extends Component {

  componentDidMount() {
    // axios.get('/api/v1/getUser').then((res) => { console.log(res)}, (err) => {
    //   console.log(err)
    // })
  }
  render() {
    return (
      <div id='login'>
        login Page<Button type="primary">login</Button>
        <img src={require('../../assets/imgs/logo192.png')}></img>
      </div>
    )
  }
}
