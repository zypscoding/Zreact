import React from 'react';
import { Table, Tooltip, Button } from 'antd';

interface EventListProps {
    className?:any,//事件列表的className
    scrollHeight?:any,//事件列表的高度
    dataSource:any,//数据源
    onEventDetailOnClick:Function,//详情按钮点击事件
}

class EventList extends React.Component<EventListProps,any>{

  constructor(props) {
    super(props);
  }

  onEventDetailOnClick = (row) => {
    this.props.onEventDetailOnClick(row);
  }

	render(){
        const { className="", dataSource=[], scrollHeight=80 } = this.props;
        const columns:any = [
            {
              title: '时间',
              dataIndex: 'time',
              render: (text) => <Tooltip title={text}><span className="text-hidden">{text}</span></Tooltip>
            },
            {
              title: '地点',
              dataIndex: 'address',
              render: (text) => <Tooltip title={text}><span className="text-hidden">{text}</span></Tooltip>
            },
            {
              title: '名称',
              dataIndex: 'name',
              render: (text) => <Tooltip title={text}><span className="text-hidden">{text}</span></Tooltip>
            },
            {
              title: '类型',
              dataIndex: 'type',
              render: (text) => <Tooltip title={text}><span className="text-hidden">{text}</span></Tooltip>
            },
            {
              title: '操作',
              key: 'operation',
              render: (row) => <Button className="operation_botton" onClick={this.onEventDetailOnClick.bind(this,row)}>事件详情</Button>,
            }
        ];
        return (
            <Table className={className} rowKey="id" pagination={false} size="small" columns={columns} dataSource={dataSource} scroll={{ y: scrollHeight }}/>
        );
	}
}
export default EventList;