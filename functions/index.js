// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = require("express")();
const cors = require("cors");
const fetch = require("node-fetch");
const axios = require("axios");
const bodyParser = require("body-parser");
const session = require("express-session");
/* Manually create this file, using json data downloaded at 
firebase console-> project settings-> service accounts-> generate private key.*/
const adminConfig = require("./adminConfig.json");

admin.initializeApp({
  credential: admin.credential.cert(adminConfig),
  databaseURL: "https://restaurantqr-73126.firebaseio.com",
});

const firestore = admin.firestore();
const auth = admin.auth;

app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(
  session({
    name: "menuSessionCookie",
    secret: "qr code secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7.2 * 10 ** 6,
    },
  })
);

app.get("/", (req, res) => {
  res.send("Yoooooo what up customers!");
});

app.get("/:restaurantName/home", async (req, res) => {
  try {
    const test = await firestore
      .collection("Restaurant")
      .where("name", "==", req.params.restaurantName);
  } catch (error) {
    res.status(404).send();
  }

  res.send(test);
});

// updates a tables request list
app.put("/:restaurantName/customer/table/:id/order", async (req, res) => {
  const tableID = req.params.id;
  // const { restaurantName } = req.body;
  const restaurantName = req.params.restaurantName;
  const newItem = req.body.request;
  const updateString = `tables.table${tableID}.requests`;

  try {
    // adds a new request to the list
    await firestore
      .collection("Restaurant")
      .doc(restaurantName)
      .update({
        [updateString]: admin.firestore.FieldValue.arrayUnion(newItem),
      });
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
  res.status(200).send();
});

app.get("/:restaurant/menu", async (req, res) => {
  const restaurantName = req.params.restaurant;
  // console.log(req.session);
  // console.log(req.params);
  // if (!req.session.previousMenu) {
  //   req.session.previousMenu = {
  //     restaurant: restaurantName,
  //     table: req.params.tableID,
  //   };
  // }

  // console.log(req.session.previousMenu);

  try {
    if (!restaurantName) {
      throw undefined;
    }
    const data = await firestore
      .collection("Restaurant")
      .doc(restaurantName)
      .get();
    res.send(data.data());
  } catch (error) {
    // if (req.session.previousMenu) {
    //   const data = await firestore
    //     .collection("Restaurant")
    //     .doc(req.session.previousMenu.restaurant)
    //     .get();
    //   res.send([
    //     data.data(),
    //     req.session.previousMenu.restaurant,
    //     req.session.previousMenu.tableID,
    //   ]);
    // }

    res.status(500).send();
  }
});
app.post("/restaurant/getName", async (req, res) => {
  if (!req.body || !req.body.user) {
    res.status(400).send();
    return;
  }

  const uid = req.body.user.uid;

  try {
    const accountPreData = await firestore
      .collection("Restaurant")
      .where("uid", "==", uid)
      .get();
    const accountData = accountPreData.docs[0].data();
    res.send(accountData);
  } catch (error) {
    res.status(404).send();
    return;
  }
});

app.post("/restaurant/addNew/section", async (req, res) => {
  const currentInfo = (
    await axios.post(
      "http://localhost:5001/restaurantqr-73126/us-central1/api/restaurant/getName",
      {
        user: req.body.user,
      }
    )
  ).data;

  const name = currentInfo.name;
  if (name == null) {
    res.status(400).send();
    return;
  }

  try {
    await firestore
      .collection("Restaurant")
      .doc(name)
      .update({
        [`menu.${req.body.sectionName}`]: {},
      });
    res.status(200).send();
  } catch (error) {
    res.status(400).send();
  }
});

app.post("/restaurant/addNew/item", async (req, res) => {
  const currentInfo = (
    await axios.post(
      "http://localhost:5001/restaurantqr-73126/us-central1/api/restaurant/getName",
      {
        user: req.body.user,
      }
    )
  ).data;

  const name = currentInfo.name;

  if (name == null) {
    res.status(400).send();
    return;
  }

  try {
    await firestore
      .collection("Restaurant")
      .doc(name)
      .update({
        [`menu.${req.body.sectionName}.${req.body.itemName}`]: {
          description: req.body.description,
          price: req.body.price,
        },
      });
    res.status(200).send();
  } catch (error) {
    res.status(400).send();
  }
});

app.post("/restaurant/delete/section", async (req, res) => {
  const currentInfo = (
    await axios.post(
      "http://localhost:5001/restaurantqr-73126/us-central1/api/restaurant/getName",
      {
        user: req.body.user,
      }
    )
  ).data;

  const name = currentInfo.name;

  if (name == null) {
    res.status(400).send();
    return;
  }

  try {
    await firestore
      .collection("Restaurant")
      .doc(name)
      .update({
        [`menu.${req.body.sectionName}`]: admin.firestore.FieldValue.delete(),
      });
    res.status(200).send();
  } catch (error) {
    res.status(400).send();
  }
});

app.post("/restaurant/delete/item", async (req, res) => {
  console.log("yooooooooooo");
  const currentInfo = (
    await axios.post(
      "http://localhost:5001/restaurantqr-73126/us-central1/api/restaurant/getName",
      {
        user: req.body.user,
      }
    )
  ).data;

  const name = currentInfo.name;

  console.log(name);
  console.log(req.body);

  try {
    await firestore
      .collection("Restaurant")
      .doc(name)
      .update({
        [`menu.${req.body.sectionName}.${req.body.itemName}`]: admin.firestore.FieldValue.delete(),
      });
    res.status(200).send();
  } catch (error) {
    res.status(400).send();
  }
});

app.get("/:restaurant/staff/liverequest", async (req, res) => {

  const restaurantName = req.params.restaurant;

  try {
    const data = await firestore
      .collection("Restaurant")
      .doc(restaurantName)
      .get();
    res.send(data.data());
  } catch (error) {
    res.status(500).send();
  }
});

// get employees
app.get("/:restaurant/staff/employees", async (req, res) => {
  const restaurantName = req.params.restaurant;

  try {
    const data = await firestore
      .collection("Restaurant")
      .doc(restaurantName)
      .get();
    res.send(data.data());
  } catch (error) {
    res.status(500).send();
  }
});


// removes request
app.put("/:restaurant/deleterequest/:table/", async (req, res) => {
  const restaurant = req.params.restaurant;
  const table = req.params.table;

  console.log(req.body.newRequest);
  try {
    const data = await firestore
      .collection("Restaurant")
      .doc(restaurant)
      .update({ tables: req.body.newRequest });

  } catch (error) {
    res.status(500).send();
  }
  res.status(200).send();
});

// removes employee
app.put("/:restaurant/staff/remove/:eid", async (req, res) => {
  const eid = req.params.eid;

  console.log(eid);
  // console.log(req.body.employees);
  let employees = (req.body.employees);
  let newEmployees = (req.body.employees);
  let name = "";
  console.log(newEmployees)
  Object.keys(employees).map(employee => {
    console.log(employee);
    if (employees[employee].eid == eid) { delete newEmployees[(employee)] };
  })
  console.log(newEmployees);

  try {
    const data = await firestore
      .collection("Restaurant")
      .doc(req.params.restaurant)
      .update({ employees: newEmployees });
  } catch (error) {
    res.status(500).send();
  }
  res.status(200).send();
  // try {
  //   const data = await firestore
  //     .collection("Restaurant")
  //     .doc(req.body.restaurant)
  //     .update({ tables: req.body.newRequest });

  // } catch (error) {
  //   res.status(500).send();
  // }
});

// removes table from the restaurant
app.put("/:restaurant/deletetable/", async (req, res) => {
  const restaurant = req.params.restaurant;

  console.log(req.body.newRequest);
  try {
    const data = await firestore
      .collection("Restaurant")
      .doc(restaurant)
      .update({ tables: req.body.tables });

  } catch (error) {
    res.status(500).send();
  }
  res.status(200).send();
});

// adds restaurant info to firestore db
app.post("/restaurant/createAccount", async (req, res) => {
  const { uid, name, address } = req.body;

  const databaseEntry = {
    uid: uid,
    name: name,
    address: address,
    menu: {},
    tables: {},
    employees: {},
  };

  console.log(databaseEntry);

  await firestore.collection("Restaurant").doc(name).set(databaseEntry);

  res.status(201).send();
});

app.post("/addEmployee", async (req, res) => {
  // no emmployee name was given
  if (!req.body || !req.body.name) {
    res.status(400).send();
    return;
  }
  const { name, restaurantName, currentUser } = req.body;

  if (currentUser)
    try {
      await firestore
        .collection("Restaurant")
        .doc(restaurantName)
        .update({
          employees: admin.firestore.FieldValue.arrayUnion(name),
        });
      res.status(201).send();
    } catch (error) {
      res.status(400).send();
    }
});

// reset a table from a restaurant
app.put("/reset/:tableID", async (req, res) => {
  // have to be signed in to complete this action
  const { currentUser, restaurantName } = req.body;
  const tableID = req.params.tableID;

  // user is not signed in
  if (!currentUser.uid) {
    res.status(401).send("Unauthorized");
    return;
  }

  // (await firestore.collection("Restaurant").where('uid', "==", currentUser.uid).get()).map(query => {
  //   const bro = query.docs[0];
  //   await bro.update({[`tables.table${tableID}.requests`]: []})
  // })

  // resets the requests back to the start
  try {
    await firestore
      .collection("Restaurant")
      .doc(restaurantName)
      .update({
        [`tables.table${tableID}.requests`]: [],
      });
    res.status(200).send();
  } catch (error) {
    res.status(500).send(`Unable to reset the table ${tableID}`);
  }
});

// add a table to the restaurant
app.put("/:restaurantName/staff/edit/table/:id/", async (req, res) => {
  const tableID = req.params.id;
  // const { restaurantName } = req.body;
  const restaurantName = req.params.restaurantName;
  const updateString = `tables.table${tableID}.paid`;
  console.log(updateString);

  try {
    // adds a new request to the list
    await firestore
      .collection("Restaurant")
      .doc(restaurantName)
      .update({
        [updateString]: false,
      });
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
  res.status(200).send();
});

// add an employee to the restaurant
app.put("/:restaurantName/staff/edit/addemployee", async (req, res) => {
  const restaurantName = req.params.restaurantName;
  const updateString = `employees`;

  try {
    // adds a new request to the list
    await firestore
      .collection("Restaurant")
      .doc(restaurantName)
      .update({
        [updateString]: req.body.employees,
      });
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
  res.status(200).send();
});

// Employee clock in/out
app.put("/:restaurantName/staff/:clockinout/:eid", async (req, res) => {
  const restaurantName = req.params.restaurantName;
  const eid = req.params.employee;
  const updateString = `employees`;

  try {
    // adds a new request to the list
    await firestore
      .collection("Restaurant")
      .doc(restaurantName)
      .update({
        [updateString]: req.body.employees,
      });
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
  res.status(200).send();
});

app.post("/translate/menu", async (req, res) => {
  // Inspirtation from Amit Agarwal on https://www.labnol.org/code/19909-google-translate-api

  // hash menu in cache

  if (!req.body || !req.body.menu) {
    res.status(404).send();
    return;
  }

  // console.log(req.body);
  const menu = req.body.menu;

  // console.log(Object.entries(menu));

  const entireMenu = await Promise.all(
    Object.entries(menu).map(async (item) => {
      const bro = await parseMenu(item[0], item[1]).catch((err) =>
        console.log(err)
      );
      // console.log(bro);
      return bro;
    })
  );

  const newMenu = {};
  // entireMenu.forEach((eachMenuSection) => {
  //   newMenu[eachMenuSection];
  // });

  entireMenu.forEach((eachMenuSectionObj) => {
    const name = Object.keys(eachMenuSectionObj)[0];
    const values = Object.values(eachMenuSectionObj)[0];

    newMenu[name] = values;

    // console.log(name, values);
    // console.log("yooooo");
    // console.log(name);
    // console.log("hi");
    // console.log(values);
  });

  // console.log(entireMenu);

  firestore
    .collection("Restaurant")
    .doc("test_restaurant_3")
    .update({
      [`translations.es.menu`]: newMenu,
    });

  res.send(newMenu);
});

app.post("/translate/item", async (req, res) => {
  // translates an item back to english for the restaurant

  if (!req.body || !req.body.item || !req.body.language) {
    res.status(400).send();
    return;
  }

  const { item, language } = req.body;

  const withoutAnd = item.replace("&", "and");
  const withoutDash = withoutAnd.replace("-", " ");

  const newUrl =
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${language}&tl=en&dt=t&q=` +
    encodeURI(withoutDash);

  const preText = await axios.get(newUrl);

  const textData = preText ? preText.data : null;

  const finalData = textData ? textData[0][0][0] : null;

  if (!finalData) {
    res.send(item);
    return;
  }
  res.send(finalData);
});

const parseMenu = async (currentSection, currentObjList) => {
  // const sectionName = Object.keys(req.body.menu)[0];
  const sectionName = currentSection;
  // console.log(Object.entries(currentObjList));

  // const translatedSectionName = JSON.parse(await translate(sectionName));

  const translatedSectionName = await translate(sectionName);

  const returnMenu = {};
  returnMenu[translatedSectionName] = {};

  const items = await Promise.all(
    Object.entries(currentObjList).map(async (item) => {
      const newMenuItem = {};

      // const newName = JSON.parse(await translate(item[0]));
      // const newName = await translate(item[0]);

      // trying to reduce requests by half through appending strings
      // const newName = await translate(item[0]);

      const withoutAnd = item[1].description.replace(/\&/g, "and");
      const withoutDash = withoutAnd.replace(/\-/g, " ");
      const replacingPeriods = withoutDash.replace(/\./g, ":");

      const stringToSend = `${item[0]}. ${replacingPeriods}`;
      // const stringToSend = `${item[0]}. ${item[1].description}`;

      // console.log(stringToSend);

      // const combinedResult = await translate(stringToSend);
      let [newName, newDescription] = await translateWithDescription(
        stringToSend
      );

      // console.log(newName, newDescription);

      if (newName) {
        newName = newName.replace(".", "");
        newName = newName.trim();
      }
      if (newDescription) {
        newDescription = newDescription.replace(/\:/g, ".");
      }

      // console.log(newName, newDescription);

      // const splitResults = combinedResult.split(". ", 1);

      // const [newName, newDescription] = splitResults;

      // console.log(splitResults);

      // const newDescription = await translate(item[1].description);

      // console.log(newName);
      // const newDescription = JSON.parse(await translate(item[1].description));
      // const newDescription = await translate(item[1].description);

      // console.log(newDescription);
      newMenuItem[newName] = {};

      newMenuItem[newName]["description"] = newDescription;
      // prevents service items from having an undefined price
      if (item[1].price) {
        newMenuItem[newName]["price"] = item[1].price;
      }
      // console.log(newMenuItem);
      return newMenuItem;
    })
  );

  items.forEach((menuItem) => {
    Object.entries(menuItem).forEach((eachItem) => {
      returnMenu[translatedSectionName][eachItem[0]] = eachItem[1];
    });
  });
  return returnMenu;
};

const translate = async (text) => {
  const withoutAnd = text.replace("&", "and");
  const withoutDash = withoutAnd.replace("-", " ");

  const newUrl =
    "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=" +
    encodeURI(withoutDash);

  const preText = await axios.get(newUrl);

  const textData = preText ? preText.data : null;

  const finalData = textData ? textData[0][0][0] : null;

  if (!finalData) {
    return text;
  }

  // if (!finalData) {
  //   // res.send();
  //   return;
  // }

  // const translationResponse = JSON.stringify(
  //   (await axios.get(newUrl)).data[0][0][0]
  // );

  // const translationResponse = JSON.stringify(
  //   (await axios.get(newUrl)).data[0][0][0]
  // );
  return finalData;
};

const translateCombined = async (text, language) => {
  // need ogMenu to get original price info
  const newUrl =
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${language}&dt=t&q=` +
    encodeURI(text);

  const preText = await axios.get(newUrl);

  // number of items determines how I should parse the answers

  const resultsArr = [];
  let newSection = "";

  if (preText.data) {
    // console.log(preText.data[0]);

    // console.log(preText.data[0].length);
    let i = 0;
    // for (let i = 0; i < preText.data[0][0].length; i++) {
    while (i < preText.data[0].length) {
      // console.log(i);
      if (i === 0) {
        // newSection = preText.data[0][0][0].split("~")[0].trim();
        newSection = preText.data[0][0][0].replace(".", "").trim();
        i++;
        continue;
      }
      const currentItem = preText.data[0][i][0];

      const split = currentItem.split("~");

      const name = split[0].trim();

      let item = split[1];

      if (item == null) console.log(currentItem);
      // console.log(name, item);

      if (
        i + 1 < preText.data[0].length &&
        !preText.data[0][i + 1][0].includes("~")
      ) {
        item += preText.data[0][i + 1][0];
        i += 2;
      } else {
        i++;
      }

      // removes splitting period
      item = item.replace(/\./g, "");
      // adds the sentence separators back
      item = item.replace(/\:/g, ".");
      item = item.trim();

      resultsArr.push([name, item != "***" ? item : ""]);
    }
  }

  return [newSection, resultsArr];
};

const parseMenuV2 = async (sectionName, menuSection, language) => {
  const preStringArray = Object.entries(menuSection).map((item) => {
    // item[0] name of item
    // item[1].description the description

    const preName = item[0].replace(/\-/g, " ");
    const noSlash = preName.replace(/\//g, " ");
    const noDashName = noSlash.replace(/\&/g, "and");

    if (!item[1].description || item[1].description == "") {
      return `${noDashName} ~ ***`;
    }
    const withoutAnd = item[1].description.replace(/\&/g, "and");
    const withoutDash = withoutAnd.replace(/\-/g, " ");
    const replacingPeriods = withoutDash.replace(/\./g, ":");

    const newText = `${noDashName} ~ ${replacingPeriods}`;
    // console.log(newText);
    return newText;
  });

  // const lengthForParsing = preStringArray.length;

  const hugeText = preStringArray.join(". ");
  // console.log(lengthForParsing);

  let filteredSectionName = sectionName;
  filteredSectionName = filteredSectionName.replace(/\-/g, " ");
  filteredSectionName = filteredSectionName.replace(/\&/g, "and");
  filteredSectionName = filteredSectionName.replace(/\//g, " ");

  // const translatedSectionName = await translate(sectionName);

  const [translatedSectionName, allTextArrays] = await translateCombined(
    `${filteredSectionName} . ` + hugeText,
    language
  );
  // console.log(allTextArrays);

  const objToSend = {};

  objToSend[translatedSectionName] = {};

  allTextArrays.forEach((eachTuple) => {
    // console.log(eachTuple);
    objToSend[translatedSectionName][eachTuple[0]] = {};
    objToSend[translatedSectionName][eachTuple[0]].description = eachTuple[1];
    objToSend[translatedSectionName][eachTuple[0]].price = Math.random() * 15;
  });

  // console.log(objToSend);

  return objToSend;
};

app.post("/translate/fullMenu", async (req, res) => {
  if (!req.body || !req.body.menu || !req.body.language) {
    res.send(400);
    return;
  }

  const menu = req.body.menu;
  const language = req.body.language;
  const name = req.body.name;

  try {
    const currentMenuOptions = await firestore
      .collection("Restaurant")
      .doc(name)
      .get();
    try {
      if (currentMenuOptions.data()["translations"][language]) {
        const translations = currentMenuOptions.data()["translations"][
          language
        ];
        if (translations) {
          res.send(translations.menu);
          return;
        }
      }
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    res.status(404).send();
  }

  const entireMenu = await Promise.all(
    Object.entries(menu).map(async (item) => {
      const menuComponent = await parseMenuV2(
        item[0],
        item[1],
        language
      ).catch((err) => console.log(err));
      // console.log(bro);
      return menuComponent;
    })
  );

  const newMenu = {};

  entireMenu.forEach((eachMenuSectionObj) => {
    console.log(eachMenuSectionObj);
    const name = Object.keys(eachMenuSectionObj)[0];
    const values = Object.values(eachMenuSectionObj)[0];
    newMenu[name] = values;
  });

  firestore
    .collection("Restaurant")
    .doc(name)
    .update({
      [`translations.${language}.menu`]: newMenu,
    });

  res.send(newMenu);
});

exports.api = functions.https.onRequest(app);
