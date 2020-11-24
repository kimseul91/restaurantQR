import { Button, InputGroup, FormControl } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import key from "./key.json";
import Firebase from "../../Firebase";

function CreateQRCode(props) {
  const [tableNumber, setTable] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
  }, [image]);

  /**
   * sendToSubmit calls two functions which uses axios
   * handleSubmit(tableNumber);
   * addToFirebase(props.name, tableNumber);
   */
  const sendToSubmit = async () => {
    handleSubmit(tableNumber);
    addToFirebase(props.name, tableNumber);
  };

  /**
   * this function uses axios to make a PUT request to the following url: 
   *  https://us-central1-restaurantqr-73126.cloudfunctions.net/api/
   * with the restaurant name and table number as a parameter. 
   * 
   * @param {String} restName 
   * @param {Number} tableNumber 
   */
  const addToFirebase = async (restName, tableNumber) => {
    await axios.put(
      `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${restName}/staff/edit/table/${tableNumber}/`
    );
  };

  /**
   * this function uses axios to make a GET request to the following url: 
   * https://rapidapi.p.rapidapi.com/generateQR"
   * 
   * the parameter for the request includes the "text" (in our case is unique url that include restaurant name and table number)
   * the response type we get back will have to be "blob" in order for us to save the file into firebase storage. 
   * the header are the requried api key and host. 
   * 
   * Once blob is received from the axios call, the file geets sent to corresponding storage location in the firebase. 
   * 
   * @param {Number} tableNumber 
   */
  async function handleSubmit(tableNumber) {
    let options = {
      method: "GET",
      url: "https://rapidapi.p.rapidapi.com/generateQR",
      params: {
        text: `https://restaurantqr-73126.web.app/customer/${props.name}/${tableNumber}`,
      },
      responseType: "blob",
      headers: {
        "x-rapidapi-key": key.key,
        "x-rapidapi-host": "qrcode3.p.rapidapi.com",
      },
    };
    let result = await axios.request(options).then((x) => {
      let testimage = URL.createObjectURL(x.data);
      setImage(testimage);
      const uploadFile = Firebase.storage
        .ref(`restaurants/${props.name}/${tableNumber}`)
        .put(x.data);
      uploadFile.on(
        "state_changed",
        (snapshot) => { },
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
      <img id="returned-data" src={image} />
    </div>
  );
}

export default CreateQRCode;
