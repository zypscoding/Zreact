import { Button } from 'antd/lib/radio'
import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'

export default class index extends Component {
  render() {
    return (
      <div>
        home Page<Button>home</Button>
        <Outlet />
      </div>
    )
  }
}
