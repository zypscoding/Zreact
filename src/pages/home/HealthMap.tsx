import React from 'react'
import * as echarts from 'echarts'
import { Row, Col, Tooltip } from 'antd'

interface HealthMapProps {
  style?: any //健康度echarts的style
  HealthData: any //健康度数据源
}

interface HealthMapState {
  levelEchart: any //健康度-高风险级别占比echarts
  eventEchart: any //健康度-特大事件占比echarts
  systemEchart: any //健康度-已指挥事件占比echarts
}

class HealthMap extends React.Component<HealthMapProps, HealthMapState> {
  state = {
    levelEchart: null,
    eventEchart: null,
    systemEchart: null
  }
  requestRef: number = 0

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.initEcharts()
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.requestRef)
  }

  initEcharts = () => {
    const levelEchart = echarts.init(document.getElementById('levelEcharts'))
    const eventEchart = echarts.init(document.getElementById('eventEcharts'))
    const systemEchart = echarts.init(document.getElementById('systemEcharts'))
    this.setState({ levelEchart, eventEchart, systemEchart })
  }

  resize = () => {
    this.requestRef = requestAnimationFrame(() => {
      const { levelEchart, eventEchart, systemEchart } = this.state
      levelEchart && levelEchart.resize()
      eventEchart && eventEchart.resize()
      systemEchart && systemEchart.resize()
    })
  }

  renderEcharts = () => {
    const { HealthData } = this.props
    const { levelEchart, eventEchart, systemEchart } = this.state
    if (!HealthData) {
      return
    }
    const oneColor = [
      [0.33, ' #3adcff'],
      [0.66, '#3adcff'],
      [1, '#3adcff']
    ]
    const levelOption = this.heathOption(HealthData.levelData.name, oneColor, [HealthData.levelData])
    const eventOption = this.heathOption(HealthData.eventData.name, oneColor, [HealthData.eventData])
    const systemOption = this.heathOption(HealthData.systemData.name, oneColor, [HealthData.systemData])
    levelEchart&&levelEchart.setOption(levelOption, true)
    eventEchart&&eventEchart.setOption(eventOption, true)
    systemEchart&&systemEchart.setOption(systemOption, true)
  }

  heathOption = (newname, newColor, newdata: any[]) => {
    newdata.forEach((item) => {
      if (item.value[item.value.length - 1] === '%') {
        item.value = parseFloat(item.value)
      }
      return item
    })

    const option = {
      tooltip: {
        formatter: '{a}:{c}%'
      },
      toolbox: {
        show: false //工具栏
      },
      series: [
        {
          name: newname,
          type: 'gauge',
          // center: ['20%', '55%'],    // 默认全局居中
          // radius: '75%',//默认
          // endAngle:45,//仪表盘结束角度
          min: 0,
          max: 100,
          // max:newmax,
          // splitNumber:newmax,
          splitNumber: 5,
          axisLine: {
            show: true, //显示仪表盘轴线。
            lineStyle: {
              // 属性lineStyle控制线条样式
              width: 4, //轴线宽度
              color: newColor //仪表盘分区及颜色
            }
          },
          axisTick: {
            // 坐标轴小标记
            length: 8, // 属性length控制线长
            lineStyle: {
              // 属性lineStyle控制线条样式
              color: 'auto'
            }
          },
          splitLine: {
            show: true, // 分隔线
            length: 10, // 属性length控制线长
            lineStyle: {
              // 属性lineStyle（详见lineStyle）控制线条样式
              color: 'auto'
            }
          },
          axisLabel: {
            //刻度标签。
            show: false
          },
          pointer: {
            //指针
            length: '80%',
            width: 2
          },
          title: {
            //仪表盘标题
            show: false
          },
          detail: {
            //仪表盘详情，用于显示数据
            show: false
            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            // fontWeight: 'bolder'
          },
          data: newdata
        }
      ]
    }
    return option
  }

  render() {
    this.renderEcharts()
    const { style, HealthData } = this.props
    return (
      <Row style={{ padding: 10 }}>
        <Col xl={8} lg={8} md={8} sm={8} xs={8}>
          <div id="levelEcharts" style={style}></div>
          <div className="home_card_Health_value">{HealthData && HealthData.levelData.value}%</div>
          <div className="home_card_Health_name">
            <Tooltip title={HealthData && HealthData.levelData.name}>
              <span className="text-hidden">{HealthData && HealthData.levelData.name}</span>
            </Tooltip>
          </div>
        </Col>
        <Col xl={8} lg={8} md={8} sm={8} xs={8}>
          <div id="eventEcharts" style={style}></div>
          <div className="home_card_Health_value">{HealthData && HealthData.eventData.value}%</div>
          <div className="home_card_Health_name">
            <Tooltip title={HealthData && HealthData.eventData.name}>
              <span className="text-hidden">{HealthData && HealthData.eventData.name}</span>
            </Tooltip>
          </div>
        </Col>
        <Col xl={8} lg={8} md={8} sm={8} xs={8}>
          <div id="systemEcharts" style={style}></div>
          <div className="home_card_Health_value">{HealthData && HealthData.systemData.value}%</div>
          <div className="home_card_Health_name">
            <Tooltip title={HealthData && HealthData.systemData.name}>
              <span className="text-hidden">{HealthData && HealthData.systemData.name}</span>
            </Tooltip>
          </div>
        </Col>
      </Row>
    )
  }
}
export default HealthMap
