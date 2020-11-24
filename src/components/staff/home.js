import React from "react";
import "./style/custom.css";
import { Navbar, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import LiveRequest from "./LiveRequest.js";
import ClockView from "./ClockView.js";
import EmployeeLists from "./EmployeeLists.js";
import Firebase from "../../Firebase";
import axios from "axios";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
    };
  }

  /**
   * this useEffect uses axios to make a POST request to the following url: 
   * https://us-central1-restaurantqr-73126.cloudfunctions.net/api/restaurant/getName
   * 
   * the parameter is the current user/restaurant
   * 
   * The request is "await"ed and once the response is available, the JavaScript Object is parsed and 
   * gets stored into the name state. 
   * 
   * this gets called at the beginning of page load and every time the counter changes. 
   */
  async componentDidMount() {
    const currentInfo = (
      await axios.post(
        "https://us-central1-restaurantqr-73126.cloudfunctions.net/api/restaurant/getName",
        {
          user: Firebase.auth.currentUser,
        }
      )
    ).data;
    this.setState({ name: currentInfo.name });
  }
  renderLiveRequest() {
    return <LiveRequest name={this.state.name} />;
  }
  render() {
    return (
      <div className="staff-home-full-container">
        <div>
          <Navbar variant="dark-blue-color" className="staff-navbar">
            <Navbar.Brand>{this.state.name}</Navbar.Brand>
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
          <Container fluid>
            <Row className="staff-the-content-holder">
              <Col xs={12} lg={3} className="staff-left-col">
                <div className="staff-table-bg-color">
                  <EmployeeLists name={this.state.name} from={"staffhome"} />
                </div>
              </Col>
              <Col xs={12} lg={9} className="staff-right-col">
                <div className="staff-table-bg-color">
                  <LiveRequest name={this.state.name} />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Home;
