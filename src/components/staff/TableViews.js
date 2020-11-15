import { Table, Col, Card, Accordion, Button } from 'react-bootstrap';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import CreateQRCode from "./CreateQRCode.js";

function TableViews(props) {

    const [tables, setTables] = useState(null);
    
    useEffect(() => {
        // console.log("NAME IS " + props.name)
        const fetchData = async () => {
            const axiosCall = await axios.get(
                `http://localhost:5001/restaurantqr-73126/us-central1/api/${props.name}/staff/liverequest`
            )
            const tableLists  = axiosCall.data.tables;
            setTables(tableLists);
        }
        fetchData();
    }, []);


    return (
        <div className="staff-table-bg-color">
            <CreateQRCode name={props.name}/>
            <Accordion defaultActiveKey="0">
                <Col xs={12} lg={9} className="staff-right-col">
                    <h1>
                        Tables
                    </h1>
                    {getRow(tables)}
                </Col>
            </Accordion>
        </div>
    );
}

function getRow (tableLists) {
    if(tableLists != null) {
        const arrTables = Object.keys(tableLists).map((key,val) => {
            return [key, tableLists[key].requests]
        })
        return (
                arrTables.map((table,indx) => (
                    <Card key={table}>
                        <Accordion.Toggle as={Button} eventKey={table}>
                            {arrTables[indx][0]}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={table}>
                        <Card.Body>Hello! I'm the body</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                ))
        )
    }
    return <h2>loading...</h2>
}

export default TableViews;