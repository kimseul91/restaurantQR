import React, { useState } from 'react';
import "./home.css";
import ".././custom.css";
import { Navbar, Button, Container, Row, Col, Table, Modal, InputGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LiveRequest from "./LiveRequest.js";
import ClockView from "./ClockView.js";
import CreateQRCode from "./CreateQRCode.js";
import EmployeeLists from "./EmployeeLists.js"
// import CreateQRContainer from "./CreateQRContainer.js";
// import axios from "axios";
import fb from "../../Firebase";


class Home extends React.Component {
    // function Home(props) {
    constructor(props) {
        super(props)

    }

    renderLiveRequest() {
        // console.log("liveRequest rendering")
        return <LiveRequest name={this.props.name} />
    }
    render() {
        return <div className="staff-home-full-container">
            <div>

                <Navbar variant="dark-blue-color" className="staff-navbar">
                    <Navbar.Brand>
                        {/* <img 
                        src=""
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React BootStrap logo"
                    />{" "} */}
                        {this.props.name}
                    </Navbar.Brand>
                    <Container>
                        <Navbar.Collapse className="justify-content-center">
                            <Navbar.Text>
                                <ClockView />
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                    {/* <Button onClick={getMenuItems}> Json stuff</Button> */}
                    {/* <Button onClick={() => this.setState({show: !this.state.show})}> Create QR </Button> */}
                    <Link to="/staff/edit">
                        <Button> Edit</Button>
                    </Link>
                </Navbar>

            </div>

            <div className="staff-container-background-color">

                <Container fluid >
                    <Row className="staff-the-content-holder">
                        <Col xs={12} lg={3} className="staff-left-col">
                            {/* <div style={{ backgroundColor: "black" }}> Some content here</div> */}
                            <div className="staff-table-bg-color">

                                <Table striped >
                                    <EmployeeLists name={this.props.name} from={"staffhome"} />
                                    {/* <thead>
                                        <tr className="staff-content-center">
                                            <th className="staff-table-th" >Employees</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>John Doe</td>
                                        </tr>
                                    </tbody> */}
                                </Table>
                            </div>
                        </Col>
                        <Col xs={12} lg={9} className="staff-right-col">
                            <div style={{ backgroundColor: "#0DB4B9", marginTop: "1vw" }}>
                                {/* {this.renderLiveRequest()} */}
                                <LiveRequest name={this.props.name} />
                                {/* <CreateQRCode /> */}
                            </div>

                        </Col>
                    </Row>
                </Container>
            </div>

        </div>
    }


}

export default Home;