import { Media, Card, Accordion, Button } from "react-bootstrap";
import axios from "axios";
import React, { useState, useEffect } from "react";
import CreateQRCode from "./CreateQRCode.js";
import Firebase from "../../Firebase";

function TableViews(props) {
  const [tables, setTables] = useState(null);
  const [counter, setCounter] = useState(0);
  const [populateTablesVariable, setPop] = useState(null);

  const update = () => {
    setCounter(counter + 1);
  };

  /**
   * this useEffect uses axios to make a GET request with the restaurant name to the following url: 
   * https://us-central1-restaurantqr-73126.cloudfunctions.net/api/:restaurantName/staff/liverequest
   * 
   * The request is "await"ed and once the response is available, the JavaScript Object is parsed and 
   * stores list of tables into the tables state. 
   * 
   * this gets called at the beginning of page load and every time the counter changes. 
   */
  useEffect(() => {
    const fetchData = async () => {
      const axiosCall = await axios.get(
        `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${props.name}/staff/liverequest`
      );
      const tableLists = axiosCall.data.tables;
      setTables(tableLists);
    };
    fetchData();
  }, [props, counter]);

  /**
   * this useEffect sets tables every time the the tables state changes. 
   */
  useEffect(() => {
    setPop(populateTables());
  }, [tables]);

  /**
   * this function uses the tables state object to populate the accordion for the main restaurant page. 
   * returns html elements. 
   */
  const populateTables = () => {
    if (tables != null) {
      const arrTables = Object.keys(tables)
        .map((key, val) => {
          return [key, tables[key].requests];
        })
        .sort();
      return arrTables.map((table, indx) => (
        <Card key={table[0]}>
          <Accordion.Toggle as={Button} eventKey={table}>
            {arrTables[indx][0]}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={table}>
            <Card.Body>
              <Media>
                <Media.Body className="media-body">
                  <img
                    src={tables[table[0]].qrcode}
                    width={128}
                    height={128}
                    className="mr-3"
                    alt="qrCode"
                  />
                  <h5>QR Code for {arrTables[indx][0]}</h5>
                  <br />
                  <Button table={table[0]} onClick={printImg}>
                    Print this code
                  </Button>
                  <Button table={table[0]} onClick={deleteTable}>
                    Delete
                  </Button>
                </Media.Body>
              </Media>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      ));
    }
    return <h2>loading...</h2>;
  };

  /**
   * this function handles the "delete" feature on tables. 
   * it finds the table id that needs to get removed
   * 
   * this function uses axios to make a PUT request with the restaurant name to the following url: 
   * https://us-central1-restaurantqr-73126.cloudfunctions.net/api/:restaurant/deletetable
   * 
   * the parameter of the axios call is the new list of table object
   * 
   * then it calls update() which increments counter by 1. 
   * it deletes corresponding QR code blob file in firebase. 
   * 
   * @param {Object} event 
   */
  const deleteTable = async (event) => {
    delete tables[event.target.getAttribute("table")];
    const tableNumber = event.target
      .getAttribute("table")
      .replace(/table/g, "");
    const objToSend = {
      tables: tables,
    };
    await axios.put(
      `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${props.name}/deletetable`,
      objToSend
    );

    update();

    const uploadFile = Firebase.storage.ref(
      `restaurants/${props.name}/${tableNumber}`
    );

    uploadFile
      .delete()
      .then(function () { })
      .catch((err) => console.log(err));
  };

  /**
   * this function handles the printing of QR Code. 
   * it retrieves the correct QR Code from the firebase and renders it on the screen. 
   * @param {Object} event 
   */
  function printImg(event) {
    let url = tables[event.target.getAttribute("table")].qrcode;
    var win = window.open("");
    win.document.write(
      `<img src=${url} onload="window.print();window.close()" />`
    );
    win.focus();
  }

  return (
    <div className="staff-table-bg-color">
      <CreateQRCode name={props.name} update={update} />
      <Accordion className="tables-accordionx" defaultActiveKey="0">
        <h2>Tables</h2>
        {populateTablesVariable}
      </Accordion>
    </div>
  );
}

export default TableViews;
