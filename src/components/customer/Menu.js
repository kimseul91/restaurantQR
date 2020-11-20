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

  useEffect(() => {
    // used for animation purposes

    (async function () {
      const menuRequest = await axios.get(
        // `http://localhost:5001/restaurantqr-73126/us-central1/api/${
        //   name ? name : "null"
        // }/menu/${id ? id : "null"}`
        // `https://us-central1-restaurantqr-73126.cloudfunctions.net/api/${restaurantName}/menu`
        `http://localhost:5001/restaurantqr-73126/us-central1/api/${restaurantName}/menu`
      );

      const menuData = menuRequest.data.menu;
      // const translatedMenu = menuData.
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

      let currentLanguage;
      // gets the language code from the url
      // inspiration from https://medium.com/better-programming/using-url-parameters-and-query-strings-with-react-router-fffdcea7a8e9
      if (props.location && props.location.search) {
        const queryString = new URLSearchParams(props.location.search);
        currentLanguage = queryString.get("lang");
        console.log(currentLanguage);

        if (currentLanguage) {
          // setMenulanguage(currentLanguage);
        }
      }
      // use currentLanguage to reference the translated language

      // console.log(menuData);

      if (currentLanguage && currentLanguage !== "en") {
        // need to translate
      }

      // const translate = async (text) => {
      //   const withoutAnd = text.replace("&", "and");
      //   const withoutDash = withoutAnd.replace("-", " ");
      //   // console.log(text, withoutAnd, withoutDash);
      //   const newUrl =
      //     "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ko&dt=t&q=" +
      //     encodeURI(withoutDash);

      //   const translationResponse = (
      //     await axios.get(newUrl, {
      //       headers: {
      //         "Referrer-Policy": "no-referrer",
      //         "Access-Control-Allow-Origin": "*",
      //       },
      //     })
      //   ).data[0][0][0];
      //   // console.log(translationResponse);

      //   // const translationResponse = JSON.stringify(
      //   //   (await fetch(newUrl, { mode: "no-cors" })).data[0][0][0]
      //   // );
      //   return translationResponse;
      // };

      // const parseMenu = async (currentSection, currentObjList) => {
      //   // console.log(currentSection, currentObjList);
      //   // const sectionName = Object.keys(req.body.menu)[0];
      //   const sectionName = currentSection;
      //   // console.log(Object.entries(currentObjList));
      //   console.log(sectionName);
      //   console.log(await translate(sectionName));
      //   // const translatedSectionName = JSON.parse(await translate(sectionName));
      //   const translatedSectionName = await translate(sectionName);

      //   const returnMenu = {};
      //   returnMenu[translatedSectionName] = {};

      //   console.log(Object.entries(currentObjList));

      //   const items = await Promise.all(
      //     Object.entries(currentObjList).map(async (item) => {
      //       console.log("i am here");
      //       console.log(currentObjList);
      //       console.log(item);

      //       if (!item || !item[0] || !item[1]) {
      //         console.log(item);
      //         return null;
      //       }

      //       const newMenuItem = {};

      //       // const newName = JSON.parse(await translate(item[0]));
      //       const newName = await translate(item[0]);

      //       // console.log(newName);
      //       const newDescription = await translate(item[1].description);

      //       // const newDescription = JSON.parse(
      //       //   await translate(item[1].description)
      //       // );
      //       // console.log(newDescription);
      //       newMenuItem[newName] = {};

      //       newMenuItem[newName]["description"] = newDescription;
      //       // prevents service items from having an undefined price
      //       if (item[1].price) {
      //         newMenuItem[newName]["price"] = item[1].price;
      //       }
      //       // console.log(newMenuItem);
      //       return newMenuItem;
      //     })
      //   );

      //   items.forEach((menuItem) => {
      //     Object.entries(menuItem).forEach((eachItem) => {
      //       returnMenu[translatedSectionName][eachItem[0]] = eachItem[1];
      //     });
      //   });
      //   return returnMenu;
      // };

      // console.log("yooooooooooooooooo");

      // const entireMenu = await Promise.all(
      //   Object.entries(menuData).map(async (item) => {
      //     // console.log(item);
      //     // const bro = ;
      //     // console.log(bro);
      //     const bro = await parseMenu(item[0], item[1]);
      //     console.log(bro);
      //     return bro;
      //   })
      // );

      // console.log(entireMenu);

      const translatedMenu = await axios.post(
        "http://localhost:5001/restaurantqr-73126/us-central1/api/bro",
        {
          menu: menuData,
          language: currentLanguage,
        }
      );
      console.log(translatedMenu.data);

      // console.log(Object.entries(menuData));

      // const newValues = await Promise.all(
      //   Object.entries(menuData).map(async (sectionObj) => {
      //     const translatedSection = await axios
      //       .post(
      //         "http://localhost:5001/restaurantqr-73126/us-central1/api/translate/menu",
      //         {
      //           menu: { [sectionObj[0]]: sectionObj[1] },
      //         }
      //       )
      //       .catch((err) => console.log(err));
      //     return translatedSection;
      //   })
      // );
      // console.log(newValues);
      console.log(translatedMenu.data);

      setTimeout(() => {
        setMenu(translatedMenu.data);
        // setMenu(menuData);

        setOriginalMenu(menuData);
        // console.log(menuData);
        // console.log(Object.entries(menuData));

        const tempArr = [];
        // adds all of the menu items to the search term list
        Object.values(menuData).forEach((eachList) => {
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
