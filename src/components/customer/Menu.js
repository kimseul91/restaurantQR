import React, { useState, useEffect } from "react";
import "./customer.css";
import Header from "./Header.js";
import MenuItem from "./MenuItem.js";
import MenuHeaderAndBox from "./MenuHeaderAndBox.js";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import AutoComplete from "./AutoComplete";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";

function Menu(props) {
  // props.name == the restaurant name;
  // props.menuItems == array of menu items
  // props.language == the language to translate the menu
  const [fullMenu, setMenu] = useState(null);
  const [originalMenu, setOriginalMenu] = useState(null);
  const [itemView, setItemView] = useState(false);
  const [currentItem, setItem] = useState(null);
  const [searchTerm, setSearch] = useState("");
  const [menuLanguage, setMenulanguage] = useState("en");
  const [menuSearchTerms, setMenuSearchTerms] = useState([]);
  const languageDictionary = {
    English: "en",
    Spanish: "es",
    French: "fr",
  };

  const { restaurantName, tableID } = useParams();

  // const languageCode = props.langauge;

  // console.log(props.location.search);

  let currentLanguage;

  useEffect(() => {
    // used for animation purposes

    (async function () {
      const menuRequest = await axios.get(
        `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${decodeURI(
          restaurantName
        )}/menu`
      );

      const menuData = menuRequest.data.menu;
      menuData["Service Items"] = {
        Napkins: { description: "Your sever will bring you more napkins" },
        "Refill Drinks": {
          description: "Your sever will refill your drinks",
        },
        "Request Server": {
          description: "Your sever will come to your table",
        },
        Check: { description: "Your sever will bring you the check" },
      };

      // gets the language code from the url
      // inspiration from https://medium.com/better-programming/using-url-parameters-and-query-strings-with-react-router-fffdcea7a8e9
      if (props.location && props.location.search) {
        const queryString = new URLSearchParams(props.location.search);
        if (!queryString.get("lang")) {
          currentLanguage = "en";
        } else {
          currentLanguage = queryString.get("lang");
        }
      }
      // use currentLanguage to reference the translated language

      let translatedMenu = menuData;

      if (currentLanguage && currentLanguage !== "en") {
        // need to translate
        translatedMenu = await axios.post(
          "http://localhost:5001/restaurantqr-73126/us-central1/api/translate/fullMenu",
          {
            menu: menuData,
            language: currentLanguage,
            name: decodeURI(restaurantName),
          }
        );
        console.log(translatedMenu.data);
      }

      setTimeout(() => {
        setMenu(currentLanguage == "en" ? menuData : translatedMenu.data);
        // setMenu(menuData);

        // setOriginalMenu(menuData);
        // console.log(menuData);
        // console.log(Object.entries(menuData));

        const tempArr = [];
        // adds all of the menu items to the search term list
        Object.values(
          currentLanguage == "en" ? menuData : translatedMenu.data
        ).forEach((eachList) => {
          // console.log(eachList);
          Object.keys(eachList).forEach((eachItem) => {
            tempArr.push(eachItem);
          });
        });

        // const bro = await axios.post(
        //   "http://localhost:5001/restaurantqr-73126/us-central1/api/test_restaurant_3/menu",
        //   {
        //     data: tempArr,
        //   }
        // );

        setMenuSearchTerms(tempArr);

        // const termList = Object.values(menuData).reduce((acc, curr) => {}, []);
      }, 1200);
    })();
  }, []);

  /**
   * transistions to the menu item page
   * sets the item for itemView
   * @param {menu item object} item
   */
  const getMenuItem = (item) => {
    setItem(item);
    setItemView(true);
  };

  // sent as a prop to a menu item to change back to menu view
  const changeToMenuView = () => {
    setItemView(false);
  };

  // updates values and headers
  const updateAfterSearch = (text) => {
    setSearch(text);
  };

  // changes to the item view if you click on an item
  if (itemView) {
    return (
      <MenuItem
        name={restaurantName}
        tableID={tableID}
        item={currentItem}
        goBackToMenu={changeToMenuView}
        language={currentLanguage ? currentLanguage : "en"}
      />
    );
  }
  /**
   * menuSectionObj look like this
   * header: {
   *    tacos: {
   *        description: "yo"
   *        price: 9.00
   *     },
   *     enchiladas: {
   *        description: "yo"
   *        price: 9.00
   *     },
   * }
   */

  return (
    <div id="outerFullMenuDiv">
      <Header name={restaurantName} />
      <AutoComplete
        onlyMenuItems={menuSearchTerms}
        updateAfterSearch={updateAfterSearch}
      />
      {fullMenu ? (
        <Accordion className="menuAccordion" defaultActiveKey="0">
          {
            // makes sure the menu isn't null
            fullMenu &&
              Object.entries(fullMenu).map((menuSectionTuple, index) => (
                // maps each section and its items to a header and box
                <MenuHeaderAndBox
                  key={menuSectionTuple[0]}
                  sectionName={menuSectionTuple[0]}
                  items={menuSectionTuple[1]}
                  accID={index + 1}
                  getMenuItem={getMenuItem}
                  search={searchTerm}
                />
              ))
          }
        </Accordion>
      ) : (
        <div id="spinnerDiv">
          <Spinner animation="border" id="spinner" />
          <span id="spinnerText">Loading Menu...</span>
        </div>
      )}
    </div>
  );
}

export default Menu;
