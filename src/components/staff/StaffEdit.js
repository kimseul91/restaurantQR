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
  // function Home(props) {
  constructor(props) {
    super(props);
    this.state = {
      value: "Tables",
      name: null,
    };
  }
  async componentDidMount() {
    const currentInfo = (
      await axios.post(
        "http://localhost:5001/restaurantqr-73126/us-central1/api/restaurant/getName",
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

          {/* <Button className="admin-setting"> Setting </Button> */}
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
            {/* <Link onClick={getMenuItems}>
                        <Button> Get Data</Button>
                    </Link> */}
            <Link to="/staff">
              <Button> Main Screen</Button>
            </Link>
          </Navbar>
        </div>

        <div className="staff-container-background-color">
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

  RenderCorrectComponents = () => {
    switch (this.state.value) {
      case "Tables":
        // return <RecruitersListComponent title={this.state.value} />;
        return (
          // <div style={{ backgroundColor: "#0DB4B9", marginTop: "1vw" }}>

          <TableViews name={this.state.name} />
          // </div>
        );
      case "Employees":
        return <Employees name={this.state.name} />;
      case "Menu":
        return <EditMenu />;
      default:
        return;
    }
  };
}

/*
async function getMenuItems() {
    // let menuItems = [];

    // data.map(result => {
    //     result.result.data.map(item => {
    //         menuItems.push({
    //             name: item.menu_item_name,
    //             description: item.menu_item_description,
    //             subsection: item.subsection
    //         });
    //         // console.log(item.menu_item_name);
    //     })
    // })
    // let subsectionsInMenu = {};
    // menuItems.filter(item => {
    //     subsectionsInMenu[`${item.subsection}`] = [];
    // });

    // menuItems.map(item => {
    //     subsectionsInMenu[`${item.subsection}`].push(
    //         {
    //             "name" : item.name,
    //             "description": item.description,
    //         });
    // })
    // let subsectionsInMenuObject = {};
    // menuItems.filter(item => {
    //     subsectionsInMenuObject[`${item.subsection}`] = {};
    // });

    // menuItems.map(item => {
    //     subsectionsInMenuObject[`${item.subsection}`][`${item.name}`] = 
    //         {
    //             "description": item.description,
    //             "price" : Math.random()*5,
    //         };
    // })
    // // subsectionsInMenu.map(sub => console.log(sub));
    // console.log(subsectionsInMenu)
    // fb.postData(subsectionsInMenu);
    // fb.postDataObject(subsectionsInMenuObject);



    // Using XYZ api to get menu
    // data.map(result => {
    //     console.log(result.result.data);
    // })

    let page = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    // let page = [1];

    const yuo = async (pg) => {
        const data = await axios.get(`https://us-restaurant-menus.p.rapidapi.com/restaurant/441663/menuitems?page=${pg}`, {
            params: {},
            headers: {
                "x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
                "x-rapidapi-key": "0654d2cef3mshfee87c42ba18e1dp101920jsnbc82bd0af8e3"
            }
        })
        return data;
    }
    let totalResult = await Promise.all(page.map(async id => {
        return await yuo(id);
    }))

    let menuItems = [];

    totalResult.map(result => {
        result.data.result.data.map(item => {
            menuItems.push({
                name: item.menu_item_name,
                description: item.menu_item_description,
                subsection: item.subsection
            });
            // console.log(item.menu_item_name);
        })
    })
    console.log(menuItems);
    // use this if you want the menu to be in ARRRAY!!!!
    // let subsectionsInMenu = [];
    // menuItems.filter(item => {
    //     subsectionsInMenu[`${item.subsection}`] = {};
    // });
    // console.log(subsectionsInMenu);
    // menuItems.map(item => {
    //     subsectionsInMenu[`${item.subsection}`].push(
    //         {
    //             "name" : item.name,
    //             "description": item.description,
    //         });
    // })


    //** WE AGREED ON THE MENU TO BE MAP (OBJECT) ///
    let subsectionsInMenuObject = {};
    menuItems.filter(item => {
        subsectionsInMenuObject[`${item.subsection}`] = {};
    });

    console.log(subsectionsInMenuObject);

    menuItems.map(item => {
        subsectionsInMenuObject[`${item.subsection}`][`${item.name}`] =
        {
            "description": item.description,
            "price": Math.random() * 5,
        };
    })
    // subsectionsInMenu.map(sub => console.log(sub));
    console.log(subsectionsInMenuObject)
    // fb.postData(subsectionsInMenu);
    fb.postDataObject(subsectionsInMenuObject);

}
   */

export default StaffEdit;
