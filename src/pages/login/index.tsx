import { Button, Checkbox, Form, Input, Drawer } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const App: React.FC = () => {
  const navigate = useNavigate()
  const onFinish = (values: any) => {
    console.log('Success:', values)
    navigate('/home')
  }
  useEffect(() => {}, [])
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  const jump = () => {
    navigate('/product')
  }
  const [open, setOpen] = useState(false)
  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }
  console.log(open)
  return (
    <div id="login">
      <Form
        name="basic"
        className="login-form"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input placeholder="admin" />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password placeholder="111" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div onClick={showDrawer} style={{position:'fixed',right: 0, top:24, margin: 6, fontSize: 16, fontFamily: 'cursive', color:"#10e9ff", cursor:'pointer'}}>&lt;</div>
      <Drawer  title="实验室" placement="right" onClose={onClose} visible={open}>
        <Button onClick={jump} type="link">
          探索
        </Button>
      </Drawer>
    </div>
  )
}

export default App
