import React from 'react'
import * as echarts from 'echarts'

interface IProps {
  style?: any
  historyData: any
}

interface IState {
  historyEchart: any
}

class HistoryMap extends React.Component<IProps, IState> {
  state = {
    historyEchart: null
  }

  requestRef: number = 0

  constructor(props: any) {
    super(props)
  }

  componentDidMount() {
    this.initEcharts()
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.requestRef)
  }

  initEcharts = () => {
    const historyEchart = echarts.init(document.getElementById('historyEcharts'))
    this.setState({ historyEchart })
  }

  resize = () => {
    this.requestRef = requestAnimationFrame(() => {
      const { historyEchart } = this.state
      historyEchart && historyEchart.resize()
    })
  }

  renderEcharts = () => {
    const { historyData } = this.props
    const { historyEchart } = this.state
    if (!historyEchart) {
      return
    }
    if (!historyData) {
      return
    }
    const option = {
      tooltip: {
        trigger: 'axis'
      },
      backgroundColor: 'transparent',
      grid: {
        top: '5%',
        bottom: '5%',
        left: '5%',
        right: '5%',
        containLabel: true
      },
      calculable: true,
      xAxis: {
        show: true,
        type: 'category',
        boundaryGap: false,
        data: historyData.timeArr,
        splitLine: {
          //分割线
          show: false
        },
        axisLine: {
          //坐标轴轴线相关设置。就是数学上的x轴
          show: true,
          lineStyle: {
            color: '#1fadff'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#89e2ff',
            fontSize: 14
          },
          //坐标轴刻度标签的相关设置。
          rotate: 45 //标签旋转
        }
      },
      yAxis: {
        name: '上报事件数',
        show: true,
        type: 'value',
        splitLine: {
          show: false,
          lineStyle: {
            color: '#266aa8'
          }
        },
        axisLine: {
          //坐标轴轴线相关设置。就是数学上的y轴
          show: true,
          lineStyle: {
            color: '#1fadff'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#89e2ff',
            fontSize: 14
          }
        }
      },
      series: [
        {
          name: '一般事件上报数',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          color: ['#3adcff'],
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#3adcff'
              }
            }
          },
          data: historyData.yAxisData
        },
        {
          name: '较大事件上报数',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          color: ['#dfe205'],
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#dfe205'
              }
            }
          },

          data: historyData.yAxisData1
        },
        {
          name: '重大事件上报数',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          color: ['#ffa939'],
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#ffa939'
              }
            }
          },

          data: historyData.yAxisData2
        },
        {
          name: '特大事件上报数',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          color: ['#f31f42'],
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#f31f42'
              }
            }
          },
          data: historyData.yAxisData3
        }
      ]
    }
    historyEchart.setOption(option, true)
  }

  render() {
    this.renderEcharts()
    const { style } = this.props
    return (
      <>
        <div style={{ padding: 10 }}>
          <div id="historyEcharts" style={style}></div>
        </div>
      </>
    )
  }
}
export default HistoryMap
