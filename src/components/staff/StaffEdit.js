import React, { useState } from "react";
import {
  Navbar,
  Button,
  Container,
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./home.css";
import ".././custom.css";
import TableViews from "./TableViews.js";
import ClockView from "./ClockView.js";
import Employees from "./employees.js";
import Firebase from "../../Firebase";
import axios from "axios";
import EditMenu from "./EditFolder/EditMenu";

class StaffEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Tables",
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

  render() {
    const parentState = (e) => {
      this.setState({ value: e });
    };

    const getParentState = () => {
      return this.state.value;
    };

    /**
     * this function creates toggleable buttons for easy access to different components without
     * the page reloading
     */
    function ToggleButtonGroup() {
      const [radioValue, setRadioValue] = useState(getParentState());
      const radios = [
        { name: "Tables", value: "Tables" },
        { name: "Employees", value: "Employees" },
        { name: "Menu", value: "Menu" },
      ];
      return (
        <div className="center">
          <ButtonGroup toggle className="buttongroup">
            {radios.map((radio, idx) => (
              <ToggleButton
                className="togglebutton center"
                key={idx}
                type="radio"
                variant="primary"
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => {
                  setRadioValue(e.currentTarget.value);
                  parentState(e.currentTarget.value);
                }}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </div>
      );
    }

    return (
      <div className="staff-home-full-container">
        <div>
          <Navbar variant="dark-blue-color" className="staff-navbar">
            <Navbar.Brand>
              Edit mode <br />
              {this.state.name}
            </Navbar.Brand>
            <Container>
              <Navbar.Collapse className="justify-content-md-center">
                <Navbar.Text>
                  <ClockView />
                </Navbar.Text>
              </Navbar.Collapse>
            </Container>
            <Link to="/staff">
              <Button> Main Screen</Button>
            </Link>
          </Navbar>
        </div>

        <div className="staff-container-background-color staff-container-scroll">
          <Container fluid>
            <div className="btn-grp">
              <ToggleButtonGroup />
            </div>
          </Container>
          <Container fluid>
            <Row className="justify-content-lg-center">
              <Col xs={12} lg={9} className="center various-render">
                {this.RenderCorrectComponents()}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }

  /**
   * this function renders the correct component by changing the component within the page
   * which allows the user to toggle through multiple components without website being reloaded
   */
  RenderCorrectComponents = () => {
    switch (this.state.value) {
      case "Tables":
        return <TableViews name={this.state.name} />;
      case "Employees":
        return <Employees name={this.state.name} />;
      case "Menu":
        return <EditMenu name={this.state.name} />;
      default:
        return;
    }
  };
}

export default StaffEdit;
