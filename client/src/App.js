import React, {Component} from 'react';
import {getInitialData} from './DataProvider';
import AreaChartComponent from './AreaChartComponent';
import 'react-table/react-table.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      plotDataFrontend: getInitialData(),
      plotDataRedisMaster: getInitialData(),
      plotDataRedisSlave:getInitialData()};
  }

  componentDidMount() {
   this.startUpdates();
  }

  updatePlotData(plotDataArg) {

    // plotDataArg.state.packets = plotDataArg.state.packets
    //                                                     .filter(packet => packet.payload.payload.indexOf("options=[('NOP', None), ('NOP', None)")=== -1)
    //                                                       .reduce((init, packet) => init.concat(packet), []);
    plotDataArg.state.packets.filter(packet => packet.payload.dstPort=== 22).map(packet => console.log("SSH packet ",packet));
    plotDataArg.state.packets.filter(packet => packet.payload.payload.indexOf("token") !== -1).map(packet => console.log("Token packet ",packet));

    console.log(plotDataArg.state.packets);

      if(plotDataArg.id === 'frontend') {
        let newPlotDataFrontend = this.state.plotDataFrontend.concat({timestamp: Date.now(),
          frontend: plotDataArg.state.packets.length});
          newPlotDataFrontend= newPlotDataFrontend.slice(Math.max(newPlotDataFrontend.length - 30, 0));
          this.setState(Object.assign({}, {plotDataFrontend: newPlotDataFrontend}));
      } else if(plotDataArg.id === 'redisMaster') {
        let newPlotDataRedisMaster= this.state.plotDataRedisMaster.concat({timestamp: Date.now(),
          redisMaster: plotDataArg.state.packets.length});
          newPlotDataRedisMaster= newPlotDataRedisMaster.slice(Math.max(newPlotDataRedisMaster.length - 30, 0));
          this.setState(Object.assign({}, {plotDataRedisMaster: newPlotDataRedisMaster}));
      } else {
        let newPlotDataRedisSlave = this.state.plotDataRedisSlave.concat({timestamp: Date.now(),
          redisSlave: plotDataArg.state.packets.length});
        newPlotDataRedisSlave= newPlotDataRedisSlave.slice(Math.max(newPlotDataRedisSlave.length - 30, 0));
        this.setState(Object.assign({}, {plotDataRedisSlave: newPlotDataRedisSlave}));
      }
  }


  stopUpdates() {
    this.eventSource.close();
  }

  startUpdates() {
    this.eventSource = new EventSource('http://localhost:5000/events');
    this.eventSource.addEventListener('packets', (e) => this.updatePlotData(JSON.parse(e.data)));
    this.eventSource.addEventListener('closedConnection', () => this.stopUpdates());
  }

  render() {
    return (
      <div className="App">
        <button onClick={() => this.startUpdates()}>Start updates</button>
        <button onClick={() => this.stopUpdates()}>Stop updates</button>
        <AreaChartComponent plotDataFrontend={this.state.plotDataFrontend}
                            plotDataRedisMaster={this.state.plotDataRedisMaster}
                            plotDataRedisSlave={this.state.plotDataRedisSlave}/>
      </div>
    );
  }
}

export default App;
