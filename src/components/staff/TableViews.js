import { Table, Col, Card, Accordion, Button } from 'react-bootstrap';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CreateQRCode from "./CreateQRCode.js";
import Firebase from "../../Firebase"

function TableViews(props) {

    const [tables, setTables] = useState(null);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        // console.log("NAME IS " + props.name)
        const fetchData = async () => {
            const axiosCall = await axios.get(
                `http://localhost:5001/restaurantqr-73126/us-central1/api/${props.name}/staff/liverequest`
            )
            const tableLists = axiosCall.data.tables;
            setTables(tableLists);
        }
        fetchData();
    }, [counter]);



    const getRow = () => {
        if (tables != null) {
            const arrTables = Object.keys(tables).map((key, val) => {
                return [key, tables[key].requests]
            })
            // console.log(tables);
            return (
                arrTables.map((table, indx) => (
                    <Card key={table[0]}>
                        <Accordion.Toggle as={Button} eventKey={table}>
                            {arrTables[indx][0]}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={table}>
                            <Card.Body>
                                QR Code
                                {/* {console.log(arrTables[indx])} */}
                                <img src={tables[table[0]].qrcode} width="300px" />
                                <Button table={table[0]} onClick={deleteTable}>Delete</Button>
                                <Button table={table[0]} onClick={printImg}>Print This Page</Button>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                ))
            )
        }
        return <h2>loading...</h2>
    }

    const deleteTable = async (event) => {
        console.log(event.target.getAttribute("table"));
        delete tables[(event.target.getAttribute("table"))];
        const tableNumber = event.target.getAttribute("table").replace(/table/g, '');
        console.log(tableNumber);
        const objToSend = {
            tables: tables
        };
        setCounter(counter + 1);
        const del = await axios.put(
            `http://localhost:5001/restaurantqr-73126/us-central1/api/${props.name}/deletetable`,
            objToSend
        )
        const uploadFile = Firebase.storage
            .ref(`restaurants/test_restaurant_3/${tableNumber}`)

        uploadFile.delete().then(function () {
            ;
        }).catch(err => console.log(err));
    }

    function printImg(event) {
        let url = tables[event.target.getAttribute("table")].qrcode;
        var win = window.open('');
        win.document.write(`<img src=${url} onload="window.print();window.close()" />`);
        win.focus();
    }

    return (
        <div className="staff-table-bg-color">
            <CreateQRCode name={props.name} />
            <Accordion defaultActiveKey="0">
                <Col xs={12} lg={9} className="staff-right-col">
                    <h1>
                        Tables
                    </h1>
                    {getRow()}
                </Col>
            </Accordion>
        </div>
    );
}




export default TableViews;