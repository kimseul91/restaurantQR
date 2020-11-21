import { Navbar, Button, Container, Row, Col, Table, Modal, InputGroup, FormControl } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { responsiveFontSizes } from '@material-ui/core';
import Firebase from "../../Firebase"

let result = null;
function CreateQRCode(props) {
    const [tableNumber, setTable] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        console.log("image rendered " + image);
    }, [image]);


    const sendToSubmit = async () => {
        handleSubmit(tableNumber);
        console.log("image");
        //add to firebase
        addToFirebase(props.name, tableNumber);
    }

    const addToFirebase = async (restName, tableNumber) => {
        console.log(restName + " " + tableNumber);
        await axios.put(
            `http://localhost:5001/restaurantqr-73126/us-central1/api/${restName}/staff/edit/table/${tableNumber}/`
        );
    }

    async function handleSubmit(tableNumber) {
        console.log("SUBMIT " + tableNumber);
        let options = {
            method: 'GET',
            url: 'https://rapidapi.p.rapidapi.com/generateQR',
            params: {
                text: `http://www.restaurantQR.com/test_restaurant_3/staff/${tableNumber}`,
                // format: 'pdf'
            },
            responseType: "blob",
            headers: {
                'x-rapidapi-key': '0654d2cef3mshfee87c42ba18e1dp101920jsnbc82bd0af8e3',
                'x-rapidapi-host': 'qrcode3.p.rapidapi.com'
            }
        };
        let result = await axios.request(options).then(x => {
            // console.log(x);
            // console.log(URL.createObjectURL(x.data));
            let testimage = URL.createObjectURL(x.data);
            setImage(testimage);
            const uploadFile = Firebase.storage
                .ref(`restaurants/test_restaurant_3/${tableNumber}`)
                .put(x.data);

            uploadFile.on("state_changed", (snapshot) => { }, (error) => {
                console.log(error);
                alert("");
                return;
            }, () => {
                Firebase.storage.ref("restaurants/test_restaurant_3")
                    .child(`${tableNumber}`).getDownloadURL()
                    .then((url) => {
                        Firebase.db.collection("Restaurant")
                            .doc("test_restaurant_3").update({
                                [`tables.table${tableNumber}.qrcode`]: url,
                            });
                    });
            });
        }
        );
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