import { Media, Card, Accordion, Button } from "react-bootstrap";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import CreateQRCode from "./CreateQRCode.js";
import Firebase from "../../Firebase";

function TableViews(props) {
  const [tables, setTables] = useState(null);
  const [counter, setCounter] = useState(0);

  // const populateTablesVariable = useRef(null);

  const [populateTablesVariable, setPop] = useState(null);

  const update = () => {
    setCounter(counter + 1);
  };

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

  useEffect(() => {
    setPop(populateTables());
  }, [tables]);

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

  const deleteTable = async (event) => {
    delete tables[event.target.getAttribute("table")];
    const tableNumber = event.target
      .getAttribute("table")
      .replace(/table/g, "");
    const objToSend = {
      tables: tables,
    };
    setCounter(counter + 1);
    const del = await axios.put(
      `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${props.name}/deletetable`,
      objToSend
    );
    const uploadFile = Firebase.storage.ref(
      `restaurants/${props.name}/${tableNumber}`
    );

    uploadFile
      .delete()
      .then(function () {})
      .catch((err) => console.log(err));
  };

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
      <Accordion className="tables-accordion" defaultActiveKey="0">
        <h2>Tables</h2>
        {/* {populateTables()} */}
        {populateTablesVariable}
      </Accordion>
    </div>
  );
}

export default TableViews;
