import React from "react";
import "../customer/customer.css";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
function EditMenuHeaderAndBox(props) {
  // props.sectionName == the name of a menu section
  // props.items == the menu items for that section
  const items = Object.entries(props.items);

  // inspiration from https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
  if (
    items.length === 0 &&
    props.items.constructor === Object &&
    props.items != null
  ) {
    return (
      <Card className="menuItemWrapperCard">
        <Accordion.Toggle as={Card.Header} eventKey={props.accID}>
          {props.sectionName}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={props.accID}>
          <Card.Body className="yooooo">
            <div className="itemCard">
              <span className="itemText">{`Add a menu item to this section`}</span>
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  }

  return (
    items.length !== 0 && (
      <Card className="menuItemWrapperCard">
        <Accordion.Toggle as={Card.Header} eventKey={props.accID}>
          {props.sectionName}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={props.accID}>
          <Card.Body className="yooooo">
            <div id="menuCardsDiv editCards">
              {items.map((item) => (
                <div key={item} className="itemCard">
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

export default EditMenuHeaderAndBox;
