import React from 'react';
import * as echarts from 'echarts';
import 'echarts/map/js/china';
interface ChinaMapProps {
  style?:any,//中国地图echarts的style
  chinaData:any,//中国地图数据源
}

interface ChinaMapState {
  chinaEchart:any,//中国地图echarts
}

class ChinaMap extends React.Component<ChinaMapProps,ChinaMapState>{
    state = {
      chinaEchart:null,
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
      const chinaEchart = echarts.init(document.getElementById('chinaEcharts'));
      this.setState({chinaEchart});
    }

    resize = () => {
      this.requestRef = requestAnimationFrame(() => {
        const { chinaEchart } = this.state;
        chinaEchart&&chinaEchart.resize();
      });
    }


    renderEcharts = () => {
      const { chinaData } = this.props;
      const { chinaEchart } = this.state;
      if(!chinaEchart){
        return;
      }
      if(!chinaData){
        return;
      }
      const option = {
        tooltip: {
            triggerOn: "mousemove",
            formatter: function(e, t, n) {
                return e.seriesName + "<br />" + e.name + "：" + e.data.number
            }
        },
        visualMap: {
            min: 0,
            max: 5,
            left: 50,
            top: 40,
            itemWidth: 40,
            itemHeight: 20,
            textStyle:{
              color:'#ffffff',
            },
            orient:'horizontal',
            showLabel: true,
            pieces: [{
                value: 3,
                label: '特大',
                color: '#f31f42'
            },{
                value: 2,
                label: "重大",
                color: "#ffa939"
            }, {
                value: 1,
                label: "较大",
                color: "#dfe205"
            }, {
                value: 0,
                label: "一般",
                color: "#3adcff"
            }, {
                value: -1,
                label: "无事件",
                color: "#0E519C"
            }],
            show: true
        },
        geo: {
            map: "china",
            roam: false,
            scaleLimit: {
                min: 1,
                max: 2
            },
            zoom: 1.23,
            label: {
                normal: {
                    show: true,
                    fontSize: "14",
                    color: "#ffffff"
                }
            },
            itemStyle: {
                normal: {
                    //shadowBlur: 50,
                    //shadowColor: 'rgba(0, 0, 0, 0.2)',
                    borderColor: "rgba(0, 0, 0, 0.2)"
                },
                emphasis: {
                    areaColor: "#f2d5ad",
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    borderWidth: 0
                }
            }
        },
        series: [{
            name: "事件数",
            type: "map",
            geoIndex: 0,
            data: chinaData
        }]
      };
      chinaEchart.setOption(option, true);
    }

	render(){
        this.renderEcharts();
        const { style } = this.props;
        return (
            <div id="chinaEcharts" style={style}></div>
        );
	}
}
export default ChinaMap;