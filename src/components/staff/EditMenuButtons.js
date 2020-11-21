import React from "react";
import "../customer/customer.css";
import { Button } from "react-bootstrap";
function EditMenuButtons(props) {
  return (
    <div id="editMenuButtonDiv">
      <div className="btnRow">
        <Button className="editMenuBtns" variant="primary">
          Add A New Menu Section
        </Button>
        <Button className="editMenuBtns" variant="primary">
          Add A New Menu Item
        </Button>
      </div>
      <div className="btnRow">
        <Button className="editMenuBtns" variant="primary">
          Edit A Current Section
        </Button>
        <Button className="editMenuBtns" variant="primary">
          Edit A Current Menu Item
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
