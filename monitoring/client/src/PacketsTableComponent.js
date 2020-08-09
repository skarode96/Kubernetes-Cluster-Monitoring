import React from "react";
import DataTable from "react-data-table-component";
import Card from "react-bootstrap/Card";
import {getColumnNames} from "./DataProvider";


export default class PacketsTableComponent extends React.Component{

    render() {
        const data = this.props.packets.filter(packet => packet.packets.length !== 0)
                                        .map(packet => packet.packets)
                                        .reduce((p1, p2) => p1.concat(p2), [])
                                        .map(packet => packet.payload)
                                        .reduce((p1, p2) => p1.concat(p2), []);
        const columns = getColumnNames();

        const ExpandableComponent = ({ data }) => <Card style={{ width: '70rem' }}>
            <Card.Body>{data.payload}</Card.Body>
        </Card>;
        return(
            <React.Fragment>
                <DataTable
                    title="Packets Information"
                    columns={columns}
                    data={data}
                    expandableRows
                    pagination={true}
                    expandableRowsComponent={<ExpandableComponent />}/>
            </React.Fragment>);
    }
}