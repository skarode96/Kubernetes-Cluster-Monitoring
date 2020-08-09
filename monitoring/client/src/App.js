import React, {Component, useState} from 'react';
import {getInitialData} from './DataProvider';
import AreaChartComponent from './AreaChartComponent';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PacketsTableComponent from "./PacketsTableComponent";


const ExampleToast = ({ children }) => {
  const [show, toggleShow] = useState(true);

  return (
      <React.Fragment>
        {!show && <Button onClick={() => toggleShow(true)}>Show Toast</Button>}
        <Toast show={show} onClose={() => toggleShow(false)}>
          <Toast.Header>
            <strong className="mr-auto">React-Bootstrap</strong>
          </Toast.Header>
          <Toast.Body>{children}</Toast.Body>
        </Toast>
      </React.Fragment>
  );
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      plotDataFrontend: getInitialData(),
      plotDataRedisMaster: getInitialData(),
      plotDataRedisSlave:getInitialData(),
        packets: []
    };
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
    plotDataArg.state.packets.filter(packet => packet.payload.dstPort == 443).map(packet => console.log('Token packet', packet));

      if(plotDataArg.id === 'frontend') {
        let newPlotDataFrontend = this.state.plotDataFrontend.concat({timestamp: new Date().toLocaleTimeString(),
          frontend: plotDataArg.state.packets.length, packets: plotDataArg.state.packets});
          newPlotDataFrontend= newPlotDataFrontend.slice(Math.max(newPlotDataFrontend.length - 30, 0));
          this.setState(Object.assign({}, {plotDataFrontend: newPlotDataFrontend}));
      } else if(plotDataArg.id === 'redisMaster') {
        let newPlotDataRedisMaster= this.state.plotDataRedisMaster.concat({timestamp: new Date().toLocaleTimeString(),
          redisMaster: plotDataArg.state.packets.length, packets: plotDataArg.state.packets});
          newPlotDataRedisMaster= newPlotDataRedisMaster.slice(Math.max(newPlotDataRedisMaster.length - 30, 0));
          this.setState(Object.assign({}, {plotDataRedisMaster: newPlotDataRedisMaster}));
      } else {
        let newPlotDataRedisSlave = this.state.plotDataRedisSlave.concat({timestamp:new Date().toLocaleTimeString(),
          redisSlave: plotDataArg.state.packets.length, packets: plotDataArg.state.packets});
        newPlotDataRedisSlave= newPlotDataRedisSlave.slice(Math.max(newPlotDataRedisSlave.length - 30, 0));
        this.setState(Object.assign({}, {plotDataRedisSlave: newPlotDataRedisSlave}));
      }
  }


  stopUpdates() {
    this.eventSource.close();
  }

  startUpdates() {
    if(this.eventSource  !== undefined) {
        this.eventSource.close();
    }
    this.eventSource = new EventSource('http://localhost:5000/events');
    this.eventSource.addEventListener('packets', (e) => this.updatePlotData(JSON.parse(e.data)));
    this.eventSource.addEventListener('closedConnection', () => this.stopUpdates());
  }

  render() {
    return (
        <React.Fragment>
        <Container>
          <Jumbotron>
            <h1 className="header" style={{textAlign: "center"}}>Kubernetes Monitoring Dashboard</h1>
          </Jumbotron>
        </Container>
        <Container>
            <Row className="justify-content-md-center">
                <Col xs lg="4"/>
                <Col xs lg="2">
                    <Button onClick={() => this.startUpdates()}>Start updates</Button>
                </Col>
                <Col xs lg="2">
                    <Button onClick={() => this.stopUpdates()}>Stop updates</Button>
                </Col>
                <Col xs lg="4"/>
            </Row>
            <Row  className="justify-content-md-center">
                <Col xs lg="8">

                    <AreaChartComponent plotDataFrontend={this.state.plotDataFrontend}
                                        plotDataRedisMaster={this.state.plotDataRedisMaster}
                                        plotDataRedisSlave={this.state.plotDataRedisSlave}/>
                </Col>
                <Col xs lg="4">

                </Col>
            </Row>
            <Row>
                {this.state.plotDataFrontend && <PacketsTableComponent packets={this.state.plotDataFrontend}/>}
            </Row>

        </Container>
        </React.Fragment>

    );
  }
}

export default App;
