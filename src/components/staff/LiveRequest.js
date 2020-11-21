import { Container, Table } from "react-bootstrap";
import fb from "../../Firebase";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import { request } from 'express';

function LiveRequest(props) {
  const [liveRequests, setRequest] = useState(null);
  console.log(props.name);

  useEffect(async () => {
    const currentInfo = (
      await axios.post(
        "http://localhost:5001/restaurantqr-73126/us-central1/api/restaurant/getName",
        {
          user: fb.auth.currentUser,
        }
      )
    ).data;
    const liveRequest = await axios.get(
      `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${currentInfo.name}/liverequest`
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
      return [
        key,
        tableRequests[key].requests ? tableRequests[key].requests : [],
      ];
    });
    // console.log("array");
    console.log(arrTables);
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
