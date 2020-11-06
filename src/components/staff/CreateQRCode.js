import { Navbar, Button, Container, Row, Col, Table, Modal, InputGroup, FormControl } from 'react-bootstrap';
import React, {useState} from 'react';
import axios from 'axios';
import { responsiveFontSizes } from '@material-ui/core';

let result = null;
function CreateQRCode(props) {
    const [tableNumber, setTable] = useState("");
    const [image, setImage] = useState(null);

    const sendToSubmit = () => {
        setImage(handleSubmit(tableNumber));
    }
    return (
        <div>
            <h3>CreateQRCode</h3>
            <InputGroup className="mb-3">
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
            <img src={image}/>


        </div>
    );
}
function handleSubmit(tableNumber) {
    console.log("SUBMIT " + tableNumber);
    // const tableURL = `http://www.restaurantQR.com/test_restaurant_3/staff/${tableNumber}`

    let options = {
        method: 'GET',
        url: 'https://rapidapi.p.rapidapi.com/generateQR',
        params: {
            text: `http://www.restaurantQR.com/test_restaurant_3/staff/${tableNumber}`,
            // format: 'pdf'
        },
        headers: {
            'x-rapidapi-key': '0654d2cef3mshfee87c42ba18e1dp101920jsnbc82bd0af8e3',
            'x-rapidapi-host': 'qrcode3.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        return response.data;
        // this.result = response.data;
    }).catch(function (error) {
        console.error(error);
    });
}

export default CreateQRCode;