import Demo1 from '@/components/Demo1'
import { Button, Card, Col, Drawer, Radio, Row, Tooltip } from 'antd'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'
const index: React.FC = () => {
  const [isFullScreen, setIsFullScreen] = useState(false)

  return (
      <div id="home" className="home">
      <Row
          gutter={24}
          >
          <Card
              className="home_title"
              bordered={false}
              bodyStyle={{ padding: 0 }}
              >
              监控中心
              {isFullScreen?<FullscreenOutlined style={{fontSize:24,marginLeft:35}}/>:<FullscreenExitOutlined style={{fontSize:24,marginLeft:35}}/>}
          </Card>
      </Row>
      <Row
          gutter={24}
          style={{padding:20}}
          >
          <Col xl={6} lg={24} md={24} sm={24} xs={24} style={{padding:0}}>
            <Col xl={24} lg={12} md={24} sm={24} xs={24}>
              <Card
                className="home_card"
                bordered={false}
                // loading={loading} 当card中存在多个div时，card的loading属性，会导致echarts加载失败
                bodyStyle={{ padding: 0 }}
                >
                  <div className="home_card_title" style={{paddingRight:80,position:'relative'}}>
                      <Tooltip title="历史事件概览">
                          <span className="text-hidden">历史事件概览</span>
                      </Tooltip>
                      {/* <Radio.Group value={days} onChange={this.onChange} style={{position:'absolute',right:0,top:5,width:80}}>
                          <Radio style={radioStyle} value={7}>最近7天</Radio>
                          <Radio style={radioStyle} value={30}>最近30天</Radio>
                      </Radio.Group> */}
                  </div>
                  <div className="sjzs">
                      <span className="item">事件总数</span>
                      {/* <span className="count">{historyNum}</span> */}
                  </div>
                  {/* <HistoryMap key="historyMap" ref={this.onRef} historyData={historyData} style={{height:220}} /> */}
              </Card>
            </Col>
            <Col xl={24} lg={12} md={24} sm={24} xs={24}>
              <Card
                className="home_card"
                bordered={false}
                // loading={loading}
                bodyStyle={{ padding: 0 }}
                >
                  <div className="home_card_title">
                    <Tooltip title="网络区域历史事件TOP3">
                      <span className="text-hidden">网络区域历史事件TOP3</span>
                    </Tooltip>
                  </div>
                  {/* <Top3Map key="top3Map" ref={this.onRef} style={{height:270}} top3Data={top3Data} /> */}
              </Card>
            </Col>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Card
                  className="home_center"
                  style={{ marginBottom: 15 }}
                  bordered={false}
                  bodyStyle={{ padding: 0 }}
                  >
                  {/* <ChinaMap key="homeMap" ref={this.onRef} style={{height:700}} homeData={homeData} /> */}
              </Card>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24} style={{padding:0}}>
            <Col xl={24} lg={12} md={24} sm={24} xs={24}>
              <Card
                className="home_card home_card_right"
                bordered={false}
                bodyStyle={{ padding:0 }}
                >
                <div className="home_card_title">
                  <Tooltip title="未处理事件概览">
                    <span className="text-hidden">未处理事件概览</span>
                  </Tooltip>
                </div>
                <div className="sjzs">
                    <span className="item">事件总数</span>
                    {/* <span className="count">{unprocessedNum}</span> */}
                </div>
                {/* <UnprocessedMap key="unprocessedMap" ref={this.onRef} style={{height:220}} unprocessedData={unprocessedData} /> */}
              </Card>
            </Col>
            <Col xl={24} lg={12} md={24} sm={24} xs={24}>
              <Card
                className="home_card home_card_right"
                bordered={false}
                bodyStyle={{ padding:0 }}
                >
                <div className="home_card_title">
                  <Tooltip title="健康度">
                    <span className="text-hidden">健康度</span>
                  </Tooltip>
                </div>
                {/* <GaugeoptMap key="gaugeoptMap" ref={this.onRef} style={{height:175}} gaugeoptData={gaugeoptData} /> */}
              </Card>
            </Col>
          </Col>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              className="home_table"
              bordered={false}
              bodyStyle={{ padding:0 }}
              >
              <div className="home_card_title">
                事件列表
                <FullscreenOutlined style={{position:'absolute',right:85,top:17}}/>
              </div>
              {/* <EventList onEventDetailOnClick={this.onEventDetailOnClick} className="home_event_table" dataSource={eventList} scrollHeight={90} /> */}
            </Card>
          </Col>
      </Row>
      <Drawer
        key="eventList"
        placement="bottom"
        getContainer={document.getElementById("home") || undefined}
        className="home_drawer"
        closable={false}
        // onClose={this.onClose.bind(this,"eventList")}
        destroyOnClose={true}
        // visible={eventListVisible}
        drawerStyle={{backgroundColor:'rgba(0, 0, 0, 0.8)'}}
        height={500}
        >
          {/* <EventList onEventDetailOnClick={this.onEventDetailOnClick} className="home_event_table" dataSource={eventList} scrollHeight={410} /> */}
      </Drawer>
      <Drawer
        key="eventDetail"
        placement="bottom"
        className="event_drawer"
        getContainer={document.getElementById("home") || undefined}
        closable={false}
        destroyOnClose={true}
        // onClose={this.onClose.bind(this,"eventDetail")}
        // visible={eventDetailVisible}
        drawerStyle={{backgroundColor:'rgba(0, 0, 0, 0.8)'}}
        height={'100%'}
        >
          {/* {eventDetailVisible?
          authorityType===AuthorityType.pad?
          <EventDetailPad authorityType={authorityType} onShowMinEventList={this.onShowMinEventList} ref={this.refEventDetail} eventList={eventList} dataSource={eventDetailData} visible={eventDetailVisible} onClose={this.onClose.bind(this,"eventDetail")} />
          :
          <EventDetail authorityType={authorityType} onShowMinEventList={this.onShowMinEventList} ref={this.refEventDetail} eventList={eventList} dataSource={eventDetailData} visible={eventDetailVisible} onClose={this.onClose.bind(this,"eventDetail")} />
          :null} */}
      </Drawer>
      <Drawer
          key="minEventList"
          placement="left"
          // getContainer={isFullScreen?document.getElementById("home"):'body'}
          getContainer={false}
          closable={false}
          // visible={minEventListVisible}
          // onClose={this.onClose.bind(this,"minEventList")}
          width={860}
          destroyOnClose={true}
          drawerStyle={{backgroundColor:'rgba(0,0,0,1)'}}
          height={'100%'}
      >
        {/* <MinEventList onEventDetailOnClick={this.onEventDetailOnClick} className="home_event_table" eventList={eventList} scrollHeight={3200} dataSource={eventDetailData}/>   */}
      </Drawer>
     
      </div>
  )
}
export default index
