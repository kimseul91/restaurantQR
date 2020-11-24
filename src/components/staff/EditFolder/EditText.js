import React from "react";

function EditText(props) {
  // returns a component with all the input boxes to be used for editing/updating menus
  return (
    <div id="editTextBoxDiv">
      <div id="inputRowForEdits">
        <input
          name="section"
          className="editText"
          placeholder="Menu Section Name"
          maxLength="150"
          onChange={(event) => props.getSectionText(event.target.value)}
        ></input>
        <input
          name="item"
          className="editText"
          placeholder="Menu item name"
          maxLength="150"
          onChange={(event) => props.getItemText(event.target.value)}
        ></input>
        <input
          name="price"
          className="editText"
          placeholder="Price"
          type="number"
          onChange={(event) => props.getPrice(parseFloat(event.target.value))}
        ></input>
      </div>
      <textarea
        name="description"
        className="textareaEdit"
        placeholder="Description"
        maxLength="250"
        onChange={(event) => props.getDescription(event.target.value)}
      ></textarea>
    </div>
  );
}

export default EditText;
