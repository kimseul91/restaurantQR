import { Table } from 'react-bootstrap';
import axios from 'axios';
import React from 'react';

function TableViews(props) {
    // getTables();
    const getTables = () => {
        getData(props.name)
    }
    // const [liveRequests, setRequest] = useState(null);
    

    // useEffect(async () => {
    //     console.log("NAME IS " + props.name)
    //     const liveRequest = await axios.get(
    //         `http://localhost:5001/restaurantqr-73126/us-central1/api/${props.name}/liverequest`
    //     )
    //     const requestData  = liveRequest.data.tables;
    //     setRequest(requestData);
    //     // console.log(requestData);
    // }, []);

    getTables();
    return (
        <div className="staff-table-bg-color">

            <Table striped >
                <thead>
                    <tr className="staff-content-center">
                        <th className="staff-table-th" >Tables</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td> Table 1</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

async function getData (name) {
    const liveRequest = await axios.get(
        `http://localhost:5001/restaurantqr-73126/us-central1/api/${name}/liverequest`
    )
    console.log(liveRequest.data)
}

export default TableViews;