import React from 'react';
import * as echarts from 'echarts';

interface UndoMapProps {
    style?:any,//未处理事件echarts的style
    undoData:any,//未处理事件数据源
}

interface UndoMapState {
    undoEchart:any,//未处理事件echarts
}

class UndoMap extends React.Component<UndoMapProps,UndoMapState>{
    state = {
      undoEchart:null,
    }
    requestRef: number = 0;

    constructor(props) {
      super(props);
    }

    componentDidMount() {
      this.initEcharts();
    }

    componentWillUnmount() {
      window.cancelAnimationFrame(this.requestRef);
    }

    initEcharts = () => {
      const undoEchart = echarts.init(document.getElementById('undoEcharts'));
      this.setState({undoEchart});
    }

    resize = () => {
      this.requestRef = requestAnimationFrame(() => {
        const { undoEchart } = this.state;
        undoEchart&&undoEchart.resize();
      });
    }


    renderEcharts = () => {
        const { undoData } = this.props;
        const { undoEchart } = this.state;
        if(!undoEchart){
          return;
        }
        if(!undoData){
          return;
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
          xAxis: {
              show: true,
              type: 'category',
              boundaryGap: false,
              data: undoData.xAxisData,//
              splitLine: {
                  show: false
              },
              axisLine: { //坐标轴轴线相关设置。就是数学上的x轴
                  show: true,
                  lineStyle: {
                      color: '#1fadff'
                  }
              },
              axisTick: {
                  show: false,
              },
              axisLabel: {
                  textStyle: {
                      color: '#89e2ff',
                      fontSize: 14,
                  },
                  // interval: 0,   //坐标轴刻度标签的相关设置。
                  // rotate: 25,
              },
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
              axisLine: { //坐标轴轴线相关设置。就是数学上的y轴
                  show: true,
                  lineStyle: {
                      color: '#1fadff'
                  }
              },
              axisTick: {
                  show: false,
              },
              axisLabel: {
                  textStyle: {
                      color: '#89e2ff',
                      fontSize: 14,
                  },
              },
          },
          series: [
          {
              name: '未处置事件数',
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 8,
              color:['#2E8B57'],
              itemStyle: {
                  normal: {
                      lineStyle: {
                          color: '#2E8B57'
                      }
                  }
              },
              areaStyle: {
                  normal: {
                      color: {
                          type: 'linear',
                          x: 0,
                          y: 0,
                          x2: 0,
                          y2: 1,
                          colorStops: [{
                              offset: 0,
                              color: 'rgba(223, 226, 5,0.8)',
                          }, {
                              offset: 1,
                              color: 'rgba(223, 226, 5,0.1)',
                          }],
                          globalCoord: false
                      },
                  }
              },
              data: undoData.yAxisData//
          }]
        };
        undoEchart.setOption(option, true);
    }

	render(){
        this.renderEcharts();
        const { style } = this.props;
        return (
            <div style={{ padding:10 }}>
                <div id="undoEcharts" style={style}></div>
            </div>
        );
	}
}
export default UndoMap;