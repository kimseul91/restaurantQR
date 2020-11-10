import { Table } from 'react-bootstrap';
import axios from 'axios';
import React, {useState, useEffect} from 'react';

function TableViews(props) {

    const [tables, setTables] = useState(null);
    

    useEffect(async () => {
        // console.log("NAME IS " + props.name)
        const axiosCall = await axios.get(
            `http://localhost:5001/restaurantqr-73126/us-central1/api/${props.name}/liverequest`
        )
        const tableLists  = axiosCall.data.tables;
        setTables(tableLists);
        // console.log(requestData);
    }, []);


    return (
        <div className="staff-table-bg-color">

            <Table striped >
                <thead>
                    <tr className="staff-content-center">
                        <th className="staff-table-th" >Tables</th>
                    </tr>
                </thead>
                        {getRow(tables)}
            </Table>
        </div>
    );
}

function getRow (tableLists) {
    if(tableLists != null) {
        const arrTables = Object.keys(tableLists).map((key,val) => {
            return [key, tableLists[key].requests]
        })

        return (
                <tbody>
                    {arrTables.map((table,indx) => (
                            <tr>
                                <th>{arrTables[indx][0]}</th>
                            </tr>
                    ))}
                </tbody>
        )
    }
    return <h2>loading...</h2>
}

export default TableViews;