import React, { useState, useEffect } from "react";
import "./customer.css";
import { debounce } from "@material-ui/core";
function AutoComplete(props) {
  // keeps the state for the user input
  const [currentSearch, setSearch] = useState("");
  // keeps the list of the autocomplete items
  const [searchListItems, setList] = useState([]);
  const [hide, setHide] = useState(false);

  // use props instead of state to determine the search terms

  // array of menu item names that you can search
  const fullMenu = props.onlyMenuItems;

  const handleSearchChange = debounce((text) => {
    setSearch(text);
    handleSearch(text, false);
  }, 250);

  // updates the menu according to your search
  const handleSearch = (text, hideVar) => {
    setSearch(text);
    document.getElementById("inputBoxId").value = text;
    setHide(hideVar);
    props.updateAfterSearch(text);
  };

  // updates the autocomplete list
  useEffect(() => {
    if (currentSearch.length === 0) {
      //   console.log("yoooo");
      setList([]);
      return;
    }

    let results = fullMenu.filter((name) =>
      name.toLowerCase().includes(currentSearch.toLowerCase())
    );

    // limits to the top 5 auto complete results
    if (results.length >= 5) {
      results = results.slice(0, 5);
    }
    setList(results);
  }, [currentSearch]);

  // document.querySelectorAll(".searchTerms").forEach((element) => {
  //   element.addEventListener("click", function (e) {
  //     // console.log(this.innerHTML);
  //     e.preventDefault();
  //     handleSearch(this.innerHTML);
  //   });
  // });

  // need to map the top 5 items that match the text input
  return (
    <div className="searchDiv">
      <input
        type="text"
        className="inputBox"
        id="inputBoxId"
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder="Search for an item..."
      ></input>
      {!hide && (
        <div className="autoItemsDiv">
          {searchListItems.length !== 0 &&
            searchListItems.map((eachTerm, id) => (
              <li
                key={id}
                id={`term${id}`}
                className="searchTerms list-group-item list-group-item-light"
                onClick={() =>
                  handleSearch(
                    document.getElementById(`term${id}`).innerHTML,
                    true
                  )
                }
              >
                {eachTerm}
              </li>
            ))}
        </div>
      )}
    </div>
  );
}

export default AutoComplete;
