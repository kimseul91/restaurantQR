import { Container, Table } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";

function LiveRequest(props) {
  const [liveRequests, setRequest] = useState(null);
  const [counter, setCounter] = useState(0);

  /**
   * this useEffect uses axios to make a GET request with the restaurant name to the following url: 
   * https://us-central1-restaurantqr-73126.cloudfunctions.net/api/:restaurantName/staff/liverequest
   * 
   * The request is "await"ed and once the response is available, the JavaScript Object is parsed and 
   * gets stored into the liveRequests state. 
   * 
   * this gets called at the beginning of page load and every 15 seconds. 
   */
  useEffect(() => {
    if (props.name) {
      const interval = setInterval(() => {
        const fetchData = async () => {
          const liveRequest = await axios.get(
            `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${props.name}/staff/liverequest`
          );
          const requestData = liveRequest.data.tables;
          setRequest(requestData);
        };
        fetchData();
      }, 15000);
      return () => clearInterval(interval);
    }
  }, [props]);

  /**
   * this useEffect uses axios to make a GET request with the restaurant name to the following url: 
   * https://us-central1-restaurantqr-73126.cloudfunctions.net/api/:restaurantName/staff/liverequest
   * 
   * The request is "await"ed and once the response is available, the JavaScript Object is parsed and 
   * gets stored into the liveRequests state. 
   * 
   * this gets called every time the counter changes. 
   */
  useEffect(() => {
    if (props.name) {
      const fetchData = async () => {
        const liveRequest = await axios.get(
          `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${props.name}/staff/liverequest`
        );
        const requestData = liveRequest.data.tables;
        setRequest(requestData);
      };
      fetchData();
    }
  }, [props, counter]);

  /**
   * this function retrieves input data from the form then removes the specific item from the liveRequest 
   * this function uses axios to make a PUT request with the restaurant name to the following url: 
   * https://us-central1-restaurantqr-73126.cloudfunctions.net/api/:restaurantName/deleterequest/:table
   * parameter being sent is the new list. 
   * 
   * The request is "await"ed and once the response is available, it increments counter by 1
   */
  const removeData = async (requests, e) => {
    let element = e.target.closest("#request-row");
    let table = element.getAttribute("table");
    let item = element.getAttribute("item");
    let name = element.getAttribute("name");

    let removeItem = requests[table].requests.filter((i) => {
      return i.item !== item;
    });

    const objectsToAxios = {
      newRequest: removeItem,
    };
    await axios.put(
      `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${name}/deleterequest/${table}`,
      objectsToAxios
    );
    setCounter(counter + 1);
  };

  /**
    * this function uses the tableRequests object to populate the table of customer requests
    * returns html elements. 
    * 
    * @param {Object} tableRequests 
    * @param {String} name 
    */
  const getLiveRequestTableRow = (tableRequests, name) => {
    const doneWithTask = (event) => {
      removeData(tableRequests, event);
    };
    if (tableRequests != null) {
      let arrTables = [];
      Object.keys(tableRequests).map((key, indx) => {
        if (
          tableRequests[key].requests &&
          tableRequests[key].requests.length > 0
        ) {
          tableRequests[key].requests.map((item) => {
            return arrTables.push([
              item["time"],
              { item: item["item"], table: key },
            ]);
          });
        }
        return 0;
      });
      arrTables.sort((a, b) => b[0] - a[0]);
      return (
        <Table striped className="tables-accordion">
          <thead>
            <tr className="center">
              <th>Table</th>
              <th>Request</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {arrTables.map((item, indx) => {
              return (
                <tr
                  id="request-row"
                  name={name}
                  table={item[1].table}
                  item={item[1].item}
                  key={item[1].table + item[1].item + item[0]}
                  onClick={doneWithTask}
                >
                  <td>{item[1].table}</td>
                  <td>{item[1].item}</td>
                  <td>
                    {new Date(arrTables[indx][0] * 1000)
                      .toLocaleTimeString("en-US")
                      .toString()}
                  </td>
                </tr>
              );
            })}
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
