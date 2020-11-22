import React, { useEffect, useState } from "react";
import { Accordion, Card } from "react-bootstrap";

import EditMenuHeaderAndBox from "./EditMenuHeaderAndBox";

function MenuDiv(props) {
  return (
    <div className="centerMenuDiv">
      <Accordion defaultActiveKey="0">
        {props.menu ? (
          Object.entries(props.menu).length !== 0 &&
          Object.entries(props.menu)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map((menuSectionTuple, index) => {
              // maps each section and its items to a header and box
              return (
                <EditMenuHeaderAndBox
                  key={menuSectionTuple[0]}
                  sectionName={menuSectionTuple[0]}
                  items={menuSectionTuple[1]}
                  accID={index + 1}
                />
              );
            })
        ) : (
            <Card className="menuItemWrapperCard">
              <Accordion.Toggle as={Card.Header}>
                {
                  "To get started, add a menu section using the buttons on the left"
                }
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={1}>
                <Card.Body className="yooooo">
                  <div id="menuCardsDiv"></div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          )}
      </Accordion>
    </div>
  );
}

export default MenuDiv;
