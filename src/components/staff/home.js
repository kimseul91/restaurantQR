import React from 'react';
// import "./home.css";
// import ".././custom.css";
import "./style/custom.css"
import { Navbar, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LiveRequest from "./LiveRequest.js";
import ClockView from "./ClockView.js";
import EmployeeLists from "./EmployeeLists.js"


class Home extends React.Component {
    constructor(props) {
        super(props)
    }
    renderLiveRequest() {
        return <LiveRequest name={this.props.name} />
    }
    render() {
        return <div className="staff-home-full-container">
            <div>
                <Navbar variant="dark-blue-color" className="staff-navbar">
                    <Navbar.Brand>
                        {this.props.name}
                    </Navbar.Brand>
                    <Container className="navbar-container">
                        <Navbar.Collapse className="navbar-collapse justify-content-center">
                            <Navbar.Text className="navbar-text">
                                <ClockView />
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                    <Link to="/staff/edit">
                        <Button> Edit</Button>
                    </Link>
                </Navbar>
            </div>
            <div className="staff-container-background-color">
                <Container fluid >
                    <Row className="staff-the-content-holder">
                        <Col xs={12} lg={3} className="staff-left-col">
                            <div className="staff-table-bg-color">
                                <EmployeeLists name={this.props.name} from={"staffhome"} />
                            </div>
                        </Col>
                        <Col xs={12} lg={9} className="staff-right-col">
                            <div className="staff-table-bg-color">
                                <LiveRequest name={this.props.name} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    }
}

export default Home;
