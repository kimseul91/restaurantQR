import React, { useEffect, useState } from 'react';
import "./Auth.css";
import axios from "axios";

function DemoCustomer(props) {
    const [image, setImage] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const axiosCall = await axios.get(
                `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/Sushi-o/demoqr`
            );
            setImage(axiosCall.data)
        };
        fetchData();
    }, [])
    return (
        <div className="loginForm demo-qr-container">
            <img src={image} alt="" className="demo-qr" />
            <h5 className="demo-h6">Try out the customer page here!</h5>
        </div>
    );
}


export default DemoCustomer;