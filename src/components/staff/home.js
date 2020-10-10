import React from 'react';
import { Navbar, Button, Container, Row, Col, Table } from 'react-bootstrap';
import "./home.css";
import ".././custom.css"

function home(props) {
    return (
        <div clasName="staff-home-full-container">
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
                    restaurant_name
                </Navbar.Brand>
                    <Container>
                        <Navbar.Collapse className="justify-content-center">
                            <Navbar.Text>
                                Time now
                        </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                    <Button> Clock In </Button>
                </Navbar>
            </div>

            <div className="staff-container-background-color">

                <Container fluid >
                    <Row className="staff-the-content-holder">
                        <Col xs={12} lg={3} className="staff-left-col">
                            {/* <div style={{ backgroundColor: "black" }}> Some content here</div> */}
                            <div className="staff-table-bg-color">

                                <Table striped >
                                    <thead>
                                        <tr className="staff-content-center">
                                            <th className="staff-table-th" >Employees</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>John Doe</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                        <Col xs={12} lg={9} className="staff-right-col">
                            <div style={{ backgroundColor: "red" }}> Some content here</div>

                        </Col>
                    </Row>
                </Container>
            </div>

        </div>
    );
}

export default home;