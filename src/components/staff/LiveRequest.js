import { Container, Table } from "react-bootstrap";
import fb from "../../Firebase";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import { request } from 'express';

function LiveRequest(props) {
  const [liveRequests, setRequest] = useState(null);

  useEffect(async () => {
    const liveRequest = await axios.get(
      "http://localhost:5001/restaurantqr-73126/us-central1/api/test_restaurant_3/liverequest"
      // http://localhost:5001/restaurantqr-73126/us-central1/api/
    );
    const requestData = liveRequest.data.tables;
    setRequest(requestData);
    // console.log(requestData);
  }, []);

  return (
    <div>
      <Container fluid>{getRow(liveRequests)}</Container>
    </div>
  );
}

function getRow(tableRequests) {
  // console.log("tableRequests");
  //converting {object: {object: object}} to
  // array [tablenumber, [table request]]
  if (tableRequests != null) {
    const arrTables = Object.keys(tableRequests).map((key, val) => {
      // console.log(`key: ${key} | val: ${tableRequests[key].requests}`);
      return [key, tableRequests[key].requests];
    });
    // console.log("array");
    // console.log(arrTables);
    return (
      <div>
        <Table striped>
          <thead>
            <tr>
              <th>Table</th>
              <th>Request</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {arrTables.map((table, indx) =>
              arrTables[indx][1].map((item) => (
                <tr>
                  <th>{arrTables[indx][0]}</th>
                  <th>{item}</th>
                  <th>12:00pm</th>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    );
  }
  return <h2>loading...</h2>;
}
export default LiveRequest;
