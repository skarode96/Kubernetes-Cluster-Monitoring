import React from "react";
import DataTable from "react-data-table-component";
import Card from "react-bootstrap/Card";


export default class PacketsTableComponent extends React.Component{

    render() {
        const data = this.props.packets.map(packet => packet.payload).reduce((p1,p2) => p1.concat(p2), []);
        const columns = [
            {
                name: 'Timestamp',
                selector: 'timestamp',
                sortable: true
            },
            {
                name: 'Destination IP',
                selector: 'dstIP'
            },
            {
                name: 'Destination Port',
                selector: 'dstPort',
                sortable: true
            },
            {
                name: 'Size',
                selector: 'size',
                sortable: true
            },
            {
                name: 'Source IP',
                selector: 'srcIP',
                sortable: true
            }

        ];

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