import React from "react";
import "../../customer/customer.css";
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
          Add Menu Section
        </Button>
        <Button
          className="editMenuBtns"
          variant="primary"
          onClick={() => props.addNewItem()}
        >
          Add Menu Item
        </Button>
      </div>
      <div className="btnRow">
        <Button
          className="editMenuBtns"
          variant="primary"
          onClick={() => props.deleteSection()}
        >
          Delete Section
        </Button>
        <Button
          className="editMenuBtns"
          variant="primary"
          onClick={() => props.deleteItem()}
        >
          Delete Item
        </Button>
      </div>
    </div>
  );
}

export default EditMenuButtons;
