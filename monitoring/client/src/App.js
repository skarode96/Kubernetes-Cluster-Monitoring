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
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";


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
      let initialData = getInitialData();
      this.state = {
      plotDataFrontend: initialData,
      plotDataRedisMaster: initialData,
      plotDataRedisSlave:initialData,
      sshPackets: initialData,
      tokenPackets: initialData
    };
  }

  componentDidMount() {
   this.startUpdates();
  }

  updatePlotData(plotDataArg) {

    plotDataArg.state.packets = plotDataArg.state.packets
                                                        .filter(packet => packet.payload.payload.indexOf("options=[('NOP', None), ('NOP', None)")=== -1)
                                                          .reduce((init, packet) => init.concat(packet), []);
      this.sniffSSHPackets(plotDataArg);
      this.sniffTokenPackets(plotDataArg);

      let newPlotDataFrontend = this.state.plotDataFrontend.concat({timestamp: new Date().toLocaleTimeString(),
          frontend: plotDataArg.state.packets.length, packets: plotDataArg.state.packets});
      newPlotDataFrontend= newPlotDataFrontend.slice(Math.max(newPlotDataFrontend.length - 30, 0));
      this.setState(Object.assign({}, {plotDataFrontend: newPlotDataFrontend}));

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


    sniffTokenPackets(plotDataArg) {
        let tokenPackets = plotDataArg.state.packets
            .filter(packet => packet.payload.dstPort === 443).reduce((a,b) => a.concat({timestamp: new Date().toLocaleTimeString(), packets: b}), []);
        let packets = this.state.tokenPackets.concat(tokenPackets);
        packets= packets.slice(Math.max(tokenPackets.length - 30, 0));
        this.setState(Object.assign({}, {tokenPackets: packets}));
        return packets;
    }

    sniffSSHPackets(plotDataArg) {
        let sshPackets = plotDataArg.state.packets
            .filter(packet => packet.payload.dstPort === 22).reduce((a,b) => a.concat({timestamp: new Date().toLocaleTimeString(), packets: b}), []);
        let packets = this.state.sshPackets.concat(sshPackets);
        packets= packets.slice(Math.max(sshPackets.length - 30, 0));
        this.setState(Object.assign({}, {sshPackets: packets}));
        return packets;
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
            </Row>

            <Tabs defaultActiveKey="Frontend" id="uncontrolled-tab-example">
                <Tab eventKey="Frontend" title="Frontend">
                    {this.state.plotDataFrontend && <PacketsTableComponent packets={this.state.plotDataFrontend}/>}
                </Tab>
                <Tab eventKey="Redis Master" title="Redis Master">
                    {this.state.plotDataRedisMaster && <PacketsTableComponent packets={this.state.plotDataRedisMaster}/>}
                </Tab>
                <Tab eventKey="Redis Slave" title="Redis Slave">
                    {this.state.plotDataRedisSlave && <PacketsTableComponent packets={this.state.plotDataRedisSlave}/>}
                </Tab>
                <Tab eventKey="SSH Attack" title="SSH Attack">
                    {this.state.plotDataRedisSlave && <PacketsTableComponent packets={this.state.sshPackets}/>}
                </Tab>
                <Tab eventKey="Token Over Wire" title="Token Over Wire">
                    {this.state.plotDataRedisSlave && <PacketsTableComponent packets={this.state.tokenPackets}/>}
                </Tab>
            </Tabs>
        </Container>
        </React.Fragment>

    );
  }
}

export default App;
