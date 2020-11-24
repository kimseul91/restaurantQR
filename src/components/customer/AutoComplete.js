import React, { useState, useEffect } from "react";
import "./customer.css";
import { debounce } from "@material-ui/core";

// auto complete search component for the main menu
function AutoComplete(props) {
  // keeps the state for the user input
  const [currentSearch, setSearch] = useState("");
  // keeps the list of the autocomplete items
  const [searchListItems, setList] = useState([]);
  const [hide, setHide] = useState(false);

  // use props instead of state to determine the search terms

  // array of menu item names that you can search
  const fullMenu = props.onlyMenuItems;

  // debounces search typing
  const handleSearchChange = debounce((text) => {
    setSearch(text);
    handleSearch(text, false);
  }, 250);

  // updates the menu according to your search
  const handleSearch = (text, hidelet) => {
    setSearch(text);
    document.getElementById("inputBoxId").value = text;
    setHide(hidelet);
    props.updateAfterSearch(text);
  };

  // updates the autocomplete list
  useEffect(() => {
    if (currentSearch.length === 0) {
      setList([]);
      return;
    }

    // taken from https://gist.github.com/andrei-m/982927 with minor changes
    // this function is used to order our search results
    const getEditDistance = function (a, b) {
      if (a.length === 0) return b.length;
      if (b.length === 0) return a.length;

      let matrix = [];

      // increment along the first column of each row
      let i;
      for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
      }

      // increment each column in the first row
      let j;
      for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
      }

      // Fill in the rest of the matrix
      for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
          if (b.charAt(i - 1) === a.charAt(j - 1)) {
            matrix[i][j] = matrix[i - 1][j - 1];
          } else {
            matrix[i][j] = Math.min(
              matrix[i - 1][j - 1] + 1, // substitution
              Math.min(
                matrix[i][j - 1] + 1, // insertion
                matrix[i - 1][j] + 1
              )
            ); // deletion
          }
        }
      }

      return matrix[b.length][a.length];
    };

    let results = fullMenu
      .filter((name) =>
        name.toLowerCase().includes(currentSearch.toLowerCase())
      )
      .sort((a, b) => getEditDistance(b, a));

    // limits to the top 5 auto complete results
    if (results.length >= 5) {
      results = results.slice(0, 5);
    }
    setList(results);
  }, [currentSearch]);

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
