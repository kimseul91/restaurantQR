import React from "react";

function EditText(props) {
  return (
    <div id="editTextBoxDiv">
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
        onChange={(event) => props.getPrice(parseFloat(event.target.value))}
      ></input>
      <textarea
        name="description"
        className="editText"
        placeholder="Description"
        onChange={(event) => props.getDescription(event.target.value)}
      ></textarea>
    </div>
  );
}

export default EditText;
