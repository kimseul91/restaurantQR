import React from "react";
import "../customer/customer.css";
import { Button } from "react-bootstrap";
function EditMenuButtons(props) {
  return (
    <div id="editMenuButtonDiv">
      <div className="btnRow">
        <Button
          className="editMenuBtns"
          variant="primary"
          onClick={() => props.addNewSection()}
        >
          Add A New Menu Section
        </Button>
        <Button
          className="editMenuBtns"
          variant="primary"
          onClick={() => props.addNewItem()}
        >
          Add A New Menu Item
        </Button>
      </div>
      <div className="btnRow">
        <Button
          className="editMenuBtns"
          variant="primary"
          onClick={() => props.deleteSection()}
        >
          Delete A Section
        </Button>
        <Button
          className="editMenuBtns"
          variant="primary"
          onClick={() => props.deleteItem()}
        >
          Delete An Item
        </Button>
      </div>
      <div className="btnRow">
        <Button className="editMenuBtns" variant="primary">
          Go Back
        </Button>
      </div>
    </div>
  );
}

export default EditMenuButtons;
