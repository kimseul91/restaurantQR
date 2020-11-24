import React from "react";
import "./customer.css";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
function MenuHeaderAndBox(props) {
  // props.sectionName == the name of a menu section
  // props.items == the menu items for that section
  const searchTerm = props.search;
  const items = Object.entries(props.items).filter((item) =>
    item[0].toLowerCase().includes(searchTerm.toLowerCase())
  );

  // creates an accordion component for a specific menu section
  // creates the items under each section
  return (
    items.length !== 0 && (
      <Card className="menuItemWrapperCard">
        <Accordion.Toggle as={Card.Header} eventKey={props.accID}>
          {props.sectionName}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={props.accID}>
          <Card.Body className="yooooo">
            <div id="menuCardsDiv">
              {items.map((item) => (
                <div
                  key={item}
                  className="itemCard"
                  onClick={() => props.getMenuItem(item)}
                >
                  <span className="itemText">{`${item[0]}`}</span>
                  <span className="smallDescriptionText">{`${
                    item[1].description !== "" ? ": " : ""
                  }${item[1].description}`}</span>
                </div>
              ))}
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    )
  );
}

export default MenuHeaderAndBox;
