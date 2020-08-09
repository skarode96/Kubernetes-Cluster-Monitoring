import React, {PureComponent} from 'react';
import {CartesianGrid, Tooltip, XAxis, YAxis,} from 'recharts';
import AreaChart from "recharts/lib/chart/AreaChart";
import Area from "recharts/lib/cartesian/Area";

export default class AreaChartComponent extends PureComponent {
  render() {
    return (
      <React.Fragment>


        <AreaChart width={730} height={250} data={this.props.plotDataFrontend}
                   margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef0707" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ef0707" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#125ce5" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#125ce5" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="timestamp" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="frontend" stroke="red" fillOpacity={1} fill="url(#colorRed)" animationDuration={0.1} />
        </AreaChart>
        <h3 className="header" style={{textAlign: "center"}}>Frontend Side Car Monitor</h3>
        <br/>
        <br/>

        <AreaChart width={730} height={250} data={this.props.plotDataRedisMaster}
                   margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="timestamp" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="redisMaster" stroke="green" fillOpacity={1} fill="url(#colorGreen)" animationDuration={0.1} />
        </AreaChart>
        <h3 className="header" style={{textAlign: "center"}}>Redis Master Side Car Monitor</h3>
        <br/>
        <br/>

        <AreaChart width={730} height={250} data={this.props.plotDataRedisSlave}>
          <XAxis dataKey="timestamp" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="redisSlave" stroke="blue" fillOpacity={1} fill="url(#colorBlue)" animationDuration={0.1} />
        </AreaChart>
        <h3 className="header" style={{textAlign: "center"}}>Redis Slave Side Car Monitor</h3>
        <br/>
        <br/>
      </React.Fragment>
    );
  }
}
