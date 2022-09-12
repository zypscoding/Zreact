import React from 'react';
import * as echarts from 'echarts'

interface Top3MapProps {
  style?:any,//网络区域历史事件TOP3echarts的style
  top3Data:any,//网络区域历史事件TOP3数据源
}

interface Top3MapState {
    top3Echart:any,//网络区域历史事件TOP3echarts
}

class Top3Map extends React.Component<Top3MapProps,Top3MapState>{
    state = {
        top3Echart:null,
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
      const top3Echart = echarts.init(document.getElementById('top3Echarts'));
      this.setState({top3Echart});
    }

    resize = () => {
      this.requestRef = requestAnimationFrame(() => {
        const { top3Echart } = this.state;
        top3Echart&&top3Echart.resize();
      });
    }


    renderEcharts = () => {
        const { top3Data } = this.props;
        const { top3Echart } = this.state;
        if(!top3Echart){
          return;
        }
        if(!top3Data){
          return;
        }
        const option = {
            color: ['#0190fe'],//,'#3398DB'
            backgroundColor: 'transparent',
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              top: '12%',
              left: '5%',
              right: '5%',
              bottom: '10%',
              containLabel: true//栅格线
            },
            xAxis : [
              {
                type : 'category',
                splitLine: {
                  show: false,
                  lineStyle: {
                    color: '#292338'
                  },
                },
                axisLine: { //坐标轴轴线相关设置。就是数学上的X轴
                    show: true,
                    lineStyle: {
                      color:  '#1fadff'//"#fff"//'#1f172f'
                    }
                },
                data : top3Data.xAxisData,
                axisLabel:{
                  fontSize:14,
                  interval:0,//横轴信息全部显示
                  rotate:0,//15度角倾斜显示
                  },
                axisTick: {
                   interval:0,
                  alignWithLabel: true
                }
              }
            ],
            yAxis : [
              {
                name:"历史事件数",
                show:true,
                type : 'value',
                nameTextStyle:{
                  fontSize: 14,
                 },
                splitLine: {
                  show: false,
                  lineStyle: {
                    color: '#1f172f'
                  }
                },
                axisLabel:{
                  fontSize:15,
                },
                axisLine: { //坐标轴轴线相关设置。就是数学上的y轴
                  show: true,
                  lineStyle: {
                    color:'#1fadff'// "#fff"//'#292338'
                  }
                },
                axisTick: {
                  show: false,
                },
              }
            ],
            series : [
              {
                name:'历史事件数',
                type:'bar',
                barWidth: '60%',
                data:top3Data.yAxisData
              }
            ]
          };
        top3Echart.setOption(option, true);
    }

	render(){
        this.renderEcharts();
        const { style } = this.props;
        return (
            <div style={{ padding:10 }}>
                <div id="top3Echarts" style={style}></div>
            </div>
        );
	}
}
export default Top3Map;