import { Container, Table } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";

function LiveRequest(props) {
  const [liveRequests, setRequest] = useState(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (props.name) {
      const interval = setInterval(() => {
        const fetchData = async () => {
          const liveRequest = await axios.get(
            `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${props.name}/liverequest`
            // http://localhost:5001/restaurantqr-73126/us-central1/api/
          );
          const requestData = liveRequest.data.tables;
          setRequest(requestData);
        };
        fetchData();
      }, 300000);
      return () => clearInterval(interval);
    }
  }, [props]);
  useEffect(() => {
    if (props.name) {
      const fetchData = async () => {
        const liveRequest = await axios.get(
          `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${props.name}/liverequest`
          // http://localhost:5001/restaurantqr-73126/us-central1/api/
        );
        const requestData = liveRequest.data.tables;
        setRequest(requestData);
      };
      fetchData();
    }
  }, [props, counter]);
  const removeData = async (requests, e) => {
    setCounter(counter + 1);
    let element = e.target.closest("#request-row");
    let table = element.getAttribute("table");
    let item = element.getAttribute("item");
    let name = element.getAttribute("name");
    let removeItem = requests[table].requests.filter((i) => {
      return i == item;
    })[0];
    if (requests[table].requests.indexOf(removeItem) >= 0)
      requests[table].requests.splice(
        requests[table].requests.indexOf(removeItem),
        1
      );
    const objectsToAxios = {
      newRequest: requests,
    };
    await axios.put(
      // `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${name}/deleterequest/${table}`,
      `http://localhost:5001/restaurantqr-73126/us-central1/api/${name}/deleterequest/${table}`,
      objectsToAxios
    );
  };
  const getLiveRequestTableRow = (tableRequests, name) => {
    const doneWithTask = (event) => {
      removeData(tableRequests, event);
    };
    if (tableRequests != null) {
      const arrTables = Object.keys(tableRequests).map((key, val) => {
        return [key, tableRequests[key].requests];
      });
      return (
        <Table striped>
          <thead>
            <tr className="center">
              <th>Table</th>
              <th>Request</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {arrTables.map((table, indx) =>
              arrTables[indx][1] ? (
                arrTables[indx][1].map((item) => (
                  <tr
                    id="request-row"
                    name={name}
                    table={arrTables[indx][0]}
                    item={item}
                    key={arrTables[indx][0] + item}
                    onClick={doneWithTask}
                  >
                    <td>{arrTables[indx][0]}</td>
                    <td>{item}</td>
                    <td>12:00pm</td>
                  </tr>
                ))
              ) : (
                <></>
              )
            )}
          </tbody>
        </Table>
      );
    } else;
    return <h2>loading...</h2>;
  };
  return (
    <Container fluid className="liverequest-table">
      {getLiveRequestTableRow(liveRequests, props.name)}
    </Container>
  );
}
export default LiveRequest;
