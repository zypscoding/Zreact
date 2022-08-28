import Demo1 from '@/components/Demo1'
import { Button } from 'antd'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

const index: React.FC = () => {
  const [count, setCount] = useState('')
  const onChange = (e: any) => {
    setCount(e.target.value)
  }

  return (
    <div>
      <Demo1 />
      <h2>111131</h2>
      <p>受控</p>
      <input onChange={onChange} value={count} type="text"></input>
      <br />
      <p>非受控</p>
      <input></input>
      home Page<Button>home</Button>
      <Outlet />
    </div>
  )
}
export default index
