import { Button, InputGroup, FormControl } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import key from "./key.json";
import Firebase from "../../Firebase";

function CreateQRCode(props) {
  const [tableNumber, setTable] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    // console.log("image rendered " + image);
  }, [image]);

  const sendToSubmit = async () => {
    handleSubmit(tableNumber);
    // console.log("image");
    //add to firebase
    addToFirebase(props.name, tableNumber);
  };

  const addToFirebase = async (restName, tableNumber) => {
    // console.log(restName + " " + tableNumber);
    await axios.put(
      `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${restName}/staff/edit/table/${tableNumber}/`
    );
  };

  async function handleSubmit(tableNumber) {
    // console.log("SUBMIT " + tableNumber);
    console.log(key);
    let options = {
      method: "GET",
      url: "https://rapidapi.p.rapidapi.com/generateQR",
      params: {
        text: `https://restaurantqr-73126.web.app/customer/${props.name}/${tableNumber}`,
        // format: 'pdf'
      },
      responseType: "blob",
      headers: {
        "x-rapidapi-key": key.key,
        "x-rapidapi-host": "qrcode3.p.rapidapi.com",
      },
    };
    await axios.request(options).then((x) => {
      let testimage = URL.createObjectURL(x.data);
      setImage(testimage);
      const uploadFile = Firebase.storage
        .ref(`restaurants/${props.name}/${tableNumber}`)
        .put(x.data);
      uploadFile.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
          alert("");
          return;
        },
        () => {
          (async () =>
            await Firebase.storage
              .ref(`restaurants/${props.name}`)
              .child(`${tableNumber}`)
              .getDownloadURL()
              .then((url) => {
                Firebase.db
                  .collection("Restaurant")
                  .doc(`${props.name}`)
                  .update({
                    [`tables.table${tableNumber}.qrcode`]: url,
                  });
                props.update();
              }))();
        }
      );
    });
  }
  return (
    <div className="create-table">
      <h2>Create Table</h2>
      <InputGroup size="lg">
        <FormControl
          placeholder="Table Number"
          aria-label="Table Number"
          aria-describedby="basic-addon2"
          onChange={(e) => setTable(e.currentTarget.value)}
        />
        <InputGroup.Append>
          <Button onClick={sendToSubmit}>Generate</Button>
        </InputGroup.Append>
      </InputGroup>
      <img id="returned-data" src={image} alt="qr" />
    </div>
  );
}

export default CreateQRCode;
