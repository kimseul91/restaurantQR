import React from "react";

function EditText(props) {
  return (
    <div id="editTextBoxDiv">
      <div id="inputRowForEdits">
        <input
          name="section"
          className="editText"
          placeholder="Menu Section Name"
          onChange={(event) => props.getSectionText(event.target.value)}
        ></input>
        <input
          name="item"
          className="editText"
          placeholder="Menu item name"
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
        onChange={(event) => props.getDescription(event.target.value)}
      ></textarea>
    </div>
  );
}

export default EditText;
