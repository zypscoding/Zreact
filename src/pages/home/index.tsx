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
          ??????????????????
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
              // loading={loading} ???card???????????????div??????card???loading??????????????????echarts????????????
              bodyStyle={{ padding: 0 }}>
              <div className="home_card_title" style={{ paddingRight: 80, position: 'relative' }}>
                <Tooltip title="????????????">
                  <span className="text-hidden">????????????</span>
                </Tooltip>
              </div>
              <div className="sjzs">
                <span className="item">????????????</span>
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
                <Tooltip title="TOP3??????">
                  <span className="text-hidden">TOP3??????</span>
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
                <Tooltip title="???????????????">
                  <span className="text-hidden">???????????????</span>
                </Tooltip>
              </div>
              <div className="sjzs">
                <span className="item">????????????</span>
                <span className="count">{formatMoney(prefixInteger(Math.random() * 1000, 6), 0)}</span>
              </div>
              <UndoMap style={{ height: 220 }} undoData={undoData} />
            </Card>
          </Col>
          <Col xl={24} lg={12} md={24} sm={24} xs={24}>
            <Card className="home_card home_card_right" bordered={false} bodyStyle={{ padding: 0 }}>
              <div className="home_card_title">
                <Tooltip title="?????????">
                  <span className="text-hidden">?????????</span>
                </Tooltip>
              </div>
              <HealthMap style={{ height: 175 }} HealthData={HealthData} />
            </Card>
          </Col>
        </Col>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Card className="home_table" bordered={false} bodyStyle={{ padding: 0 }}>
            <div className="home_card_title">
              ????????????
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
  xAxisData: ['????????????', '??????', '??????'],
  yAxisData: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)]
}

const undoData = {
  xAxisData: ['11.2', '11.3', '11.4', '11.5', '11.6', '11.7', '11.8'],
  yAxisData: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)]
}
const HealthData = {
  levelData: {
    name: '???',
    value: Math.floor(Math.random() * 100)
  },
  eventData: {
    name: '???',
    value: Math.floor(Math.random() * 100)
  },
  systemData: {
    name: '???',
    value: Math.floor(Math.random() * 100)
  }
}
const eventList = [{ time: '2022-11-11', address: '??????', name: '??????', type: '???', id: 1 }]
const homeData = [
  { name: '??????', value: -1, number: 21 },
  { name: '??????', value: 2, number: 20 },
  { name: '??????', value: 3, number: 20 },
  { name: '??????', value: 0, number: 20 },
  { name: '??????', value: -1, number: 200 },
  { name: '??????', value: -1, number: 20 },
  { name: '??????', value: -1, number: 20 },
  { name: '??????', value: -1, number: 20 },
  { name: '??????', value: -1, number: 20 },
  { name: '??????', value: 1, number: 20 },
  { name: '??????', value: 2, number: 20 },
  { name: '??????', value: 2, number: 20 },
  { name: '?????????', value: 2, number: 20 },
  { name: '??????', value: -1, number: 20 },
  { name: '??????', value: -1, number: 20 },
  { name: '??????', value: -1, number: 20 },
  { name: '??????', value: -1, number: 20 },
  { name: '??????', value: -1, number: 20 },
  { name: '??????', value: -1, number: 20 },
  { name: '??????', value: -1, number: 20 },
  { name: '??????', value: 2, number: 20 },
  { name: '??????', value: 1, number: 20 },
  { name: '?????????', value: -1, number: 20 },
  { name: '??????', value: -1, number: 20 },
  { name: '??????', value: -1, number: 20 },
  { name: '??????', value: -1, number: 20 },
  { name: '??????', value: 3, number: 100 },
  { name: '??????', value: -1, number: 20 },
  { name: '??????', value: -1, number: 20 },
  { name: '??????', value: 3, number: 200 },
  { name: '??????', value: -1, number: 0 },
  { name: '??????', value: -1, number: 0 },
  { name: '????????????', value: -1, number: 0 },
  { name: '??????', value: -1, number: 0 },
  { name: '??????', value: -1, number: 0 },
]
