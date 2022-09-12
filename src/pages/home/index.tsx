import Demo1 from '@/components/Demo1'
import { Button, Card, Col, Drawer, Radio, Row, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'
import screenfull from 'screenfull'
import HistoryMap from './historyMap'
import Top3Map from './top3Map'
import UndoMap from './undoMap'
import { formatMoney, prefixInteger } from '@/utils/utils'
import HealthMap from './HealthMap'
import EventList from './eventList'
import ChinaMap from './chinaMap'

const index: React.FC = () => {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const handleScreen = () => {
    if (screenfull.isEnabled) {
      setIsFullScreen(true)
      screenfull.toggle()
    } else {
      setIsFullScreen(false)
    }
  }
  const [historyData, setHistoryData] = useState(null)
  useEffect(() => {
    const data: any = {
      timeArr: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      yAxisData: [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10)
      ],
      yAxisData2: [
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100)
      ],
      yAxisData3: [
        Math.floor(Math.random() * 50),
        Math.floor(Math.random() * 50),
        Math.floor(Math.random() * 50),
        Math.floor(Math.random() * 50),
        Math.floor(Math.random() * 50),
        Math.floor(Math.random() * 50),
        Math.floor(Math.random() * 50)
      ]
    }
    setHistoryData(data)
  }, [])
  const onEventDetailOnClick = (row) => {
    console.log(row)
  }
  return (
    <div id="home" className="home">
      <Row gutter={24}>
        <Card className="home_title" bordered={false} bodyStyle={{ padding: 0 }}>
          事件监控平台
          {isFullScreen ? (
            <FullscreenOutlined onClick={handleScreen} style={{ fontSize: 24, marginLeft: 35 }} />
          ) : (
            <FullscreenExitOutlined onClick={handleScreen} style={{ fontSize: 24, marginLeft: 35 }} />
          )}
        </Card>
      </Row>
      <Row gutter={24} style={{ padding: 20 }}>
        <Col xl={6} lg={24} md={24} sm={24} xs={24} style={{ padding: 0 }}>
          <Col xl={24} lg={12} md={24} sm={24} xs={24}>
            <Card
              className="home_card"
              bordered={false}
              // loading={loading} 当card中存在多个div时，card的loading属性，会导致echarts加载失败
              bodyStyle={{ padding: 0 }}>
              <div className="home_card_title" style={{ paddingRight: 80, position: 'relative' }}>
                <Tooltip title="历史事件">
                  <span className="text-hidden">历史事件</span>
                </Tooltip>
              </div>
              <div className="sjzs">
                <span className="item">事件总数</span>
                <span className="count">{formatMoney(prefixInteger(Math.random() * 1000, 6), 0)}</span>
              </div>
              <HistoryMap key="historyMap" historyData={historyData} style={{ height: 220 }} />
            </Card>
          </Col>
          <Col xl={24} lg={12} md={24} sm={24} xs={24}>
            <Card
              className="home_card"
              bordered={false}
              // loading={loading}
              bodyStyle={{ padding: 0 }}>
              <div className="home_card_title">
                <Tooltip title="TOP3事件">
                  <span className="text-hidden">TOP3事件</span>
                </Tooltip>
              </div>
              <Top3Map key="top3Map" style={{ height: 270 }} top3Data={top3Data} />
            </Card>
          </Col>
        </Col>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <Card className="home_center" style={{ marginBottom: 15 }} bordered={false} bodyStyle={{ padding: 0 }}>
            <ChinaMap style={{ height: 700 }} chinaData={homeData} />
          </Card>
        </Col>
        <Col xl={6} lg={24} md={24} sm={24} xs={24} style={{ padding: 0 }}>
          <Col xl={24} lg={12} md={24} sm={24} xs={24}>
            <Card className="home_card home_card_right" bordered={false} bodyStyle={{ padding: 0 }}>
              <div className="home_card_title">
                <Tooltip title="未处理事件">
                  <span className="text-hidden">未处理事件</span>
                </Tooltip>
              </div>
              <div className="sjzs">
                <span className="item">事件总数</span>
                <span className="count">{formatMoney(prefixInteger(Math.random() * 1000, 6), 0)}</span>
              </div>
              <UndoMap style={{ height: 220 }} undoData={undoData} />
            </Card>
          </Col>
          <Col xl={24} lg={12} md={24} sm={24} xs={24}>
            <Card className="home_card home_card_right" bordered={false} bodyStyle={{ padding: 0 }}>
              <div className="home_card_title">
                <Tooltip title="健康度">
                  <span className="text-hidden">健康度</span>
                </Tooltip>
              </div>
              <HealthMap style={{ height: 175 }} HealthData={HealthData} />
            </Card>
          </Col>
        </Col>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Card className="home_table" bordered={false} bodyStyle={{ padding: 0 }}>
            <div className="home_card_title">
              事件列表
              <FullscreenOutlined style={{ position: 'absolute', right: 85, top: 17 }} />
            </div>
            <EventList onEventDetailOnClick={onEventDetailOnClick} className="home_event_table" dataSource={eventList} scrollHeight={90} />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
export default index
const top3Data = {
  xAxisData: ['浦东新区', '闵行', '静安'],
  yAxisData: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)]
}

const undoData = {
  xAxisData: ['11.2', '11.3', '11.4', '11.5', '11.6', '11.7', '11.8'],
  yAxisData: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)]
}
const HealthData = {
  levelData: {
    name: '低',
    value: Math.floor(Math.random() * 100)
  },
  eventData: {
    name: '中',
    value: Math.floor(Math.random() * 100)
  },
  systemData: {
    name: '高',
    value: Math.floor(Math.random() * 100)
  }
}
const eventList = [{ time: '2022-11-11', address: '上海', name: '张三', type: '低', id: 1 }]
const homeData = [
  { name: '江苏', value: -1, number: 21 },
  { name: '安徽', value: 2, number: 20 },
  { name: '湖北', value: 3, number: 20 },
  { name: '湖南', value: 0, number: 20 },
  { name: '广东', value: -1, number: 200 },
  { name: '浙江', value: -1, number: 20 },
  { name: '福建', value: -1, number: 20 },
  { name: '山东', value: -1, number: 20 },
  { name: '河南', value: -1, number: 20 },
  { name: '四川', value: 1, number: 20 },
  { name: '河北', value: 2, number: 20 },
  { name: '江西', value: 2, number: 20 },
  { name: '黑龙江', value: 2, number: 20 },
  { name: '陕西', value: -1, number: 20 },
  { name: '贵州', value: -1, number: 20 },
  { name: '吉林', value: -1, number: 20 },
  { name: '广西', value: -1, number: 20 },
  { name: '山西', value: -1, number: 20 },
  { name: '云南', value: -1, number: 20 },
  { name: '辽宁', value: -1, number: 20 },
  { name: '甘肃', value: 2, number: 20 },
  { name: '重庆', value: 1, number: 20 },
  { name: '内蒙古', value: -1, number: 20 },
  { name: '海南', value: -1, number: 20 },
  { name: '天津', value: -1, number: 20 },
  { name: '新疆', value: -1, number: 20 },
  { name: '上海', value: 3, number: 100 },
  { name: '宁夏', value: -1, number: 20 },
  { name: '青海', value: -1, number: 20 },
  { name: '北京', value: 3, number: 200 },
  { name: '西藏', value: -1, number: 0 },
  { name: '台湾', value: -1, number: 0 },
  { name: '南海诸岛', value: -1, number: 0 },
  { name: '香港', value: -1, number: 0 },
  { name: '澳门', value: -1, number: 0 },
]
