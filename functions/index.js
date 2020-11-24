const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = require("express")();
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
/* Manually create this file, using json data downloaded at 
firebase console-> project settings-> service accounts-> generate private key.*/
const adminConfig = require("./adminConfig.json");

admin.initializeApp({
  credential: admin.credential.cert(adminConfig),
  databaseURL: "https://restaurantqr-73126.firebaseio.com",
});

const firestore = admin.firestore();

app.use(cors({ origin: true }));
app.options("*", cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Yoooooo what up customers!");
});

// updates a tables request list
app.put("/:restaurantName/customer/table/:id/order", async (req, res) => {
  const tableID = req.params.id;
  const restaurantName = req.params.restaurantName;
  const newItem = req.body.request;
  const time = req.body.time;
  const updateString = `tables.table${tableID}.requests`;

  try {
    // adds a new request to the list
    await firestore
      .collection("Restaurant")
      .doc(restaurantName)
      .update({
        [updateString]: admin.firestore.FieldValue.arrayUnion({
          item: newItem,
          time: time,
        }),
      });
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
  res.status(200).send();
});

app.get("/:restaurant/menu", async (req, res) => {
  const restaurantName = req.params.restaurant;

  try {
    if (!restaurantName) {
      throw new Error();
    }
    const data = await firestore
      .collection("Restaurant")
      .doc(restaurantName)
      .get();
    res.send(data.data());
  } catch (error) {
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
    res.send({ name: accountData.name });
  } catch (error) {
    res.status(404).send();
    return;
  }
});

app.post("/restaurant/addNew/section", async (req, res) => {
  const name = req.body.name;
  if (!name) {
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
  const name = req.body.name;

  if (!name) {
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
  const name = req.body.name;

  if (!name) {
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
  const name = req.body.name;

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

/**
  * Purpose:
  *         Gets details about of the restaurant
  * Endpoint:
  *         GET  https://us-central1-restaurantqr-73126.cloudfunctions.net/api/:restaurant/staff/liverequest
  *         Note: Replace ":restaurant" in the above route with the restaurant name to retrieve
  * Request Params:
  *         This route does not accept request params, but the name of the restaurant
  *         that should be retrieved must be specified in the URL.
  * Response:
  *         This route responds with details about the restaurant field data in
  *         JSON format.
  */
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

/**
  * Purpose:
  *         Gets details about all of the employees
  * Endpoint:
  *         GET  https://us-central1-restaurantqr-73126.cloudfunctions.net/api/:restaurant/staff/employees
  *         Note: Replace ":restaurant" in the above route with the restaurant name to retrieve
  * Request Params:
  *         This route does not accept request params, but the name of the employees
  *         that should be retrieved must be specified in the URL.
  * Response:
  *         This route responds with details about the employees field data in
  *         JSON format.
  */
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

/**
  * Purpose:
  *         Permanently deletes a specific request
  * Endpoint:
  *         PUT  https://us-central1-restaurantqr-73126.cloudfunctions.net/api/:restaurant/deleterequest/:table
  *         Note: Replace ":restaurant" in the above route with the restaurant name to delete request
  *         Note: Replace ":table" in the above route with the table number to deleete request
  * Request Params:
  *         body (Object) - Required. The new list of requested list
  * Response:
  *         Upon successful request, the route responds with 200 status code
  */
app.put("/:restaurant/deleterequest/:table", async (req, res) => {
  const restaurant = req.params.restaurant;
  const table = req.params.table;

  console.log(req.body.newRequest);

  try {
    const data = await firestore
      .collection("Restaurant")
      .doc(restaurant)
      .update({ [`tables.${table}.requests`]: req.body.newRequest });
  } catch (error) {
    res.status(500).send();
  }
  res.status(200).send();
});

/**
  * Purpose:
  *         Permanently deletes a specific employee
  * Endpoint:
  *         PUT  https://us-central1-restaurantqr-73126.cloudfunctions.net/api/:restaurant/staff/remove/:eid
  *         Note: Replace ":restaurant" in the above route with the restaurant name to delete 
  *         Note: Replace ":eid" in the above route with the employee id to deleete 
  * Request Params:
  *         body (Object) - Required. The whole list of employees list
  * Response:
  *         Upon successful request, the route responds with 200 status code
  */
app.put("/:restaurant/staff/remove/:eid", async (req, res) => {
  const eid = req.params.eid;

  console.log(eid);
  // console.log(req.body.employees);
  let employees = req.body.employees;
  let newEmployees = req.body.employees;
  let name = "";
  console.log(newEmployees);
  Object.keys(employees).map((employee) => {
    console.log(employee);
    if (employees[employee].eid === eid) {
      delete newEmployees[employee];
    }
    return;
  });

  try {
    const data = await firestore
      .collection("Restaurant")
      .doc(req.params.restaurant)
      .update({ employees: newEmployees });
  } catch (error) {
    res.status(500).send();
  }
  res.status(200).send();
});

/**
  * Purpose:
  *         Permanently deletes a specific table
  * Endpoint:
  *         PUT  https://us-central1-restaurantqr-73126.cloudfunctions.net/api/:restaurant/deletetable
  *         Note: Replace ":restaurant" in the above route with the restaurant name to delete 
  * Request Params:
  *         body (Object) - Required. The new list of table list
  * Response:
  *         Upon successful request, the route responds with 200 status code
  */
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

  await firestore.collection("Restaurant").doc(name).set(databaseEntry);

  res.status(201).send();
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

/**
  * Purpose:
  *         Create a new table in the database
  * Endpoint:
  *         PUT  https://us-central1-restaurantqr-73126.cloudfunctions.net/api/:restaurant/staff/edit/table/:id/
  *         Note: Replace ":restaurant" in the above route with the restaurant name to add 
  *         Note: Replace ":id" in the above route with the table id to add 
  * Request Params:
  *         body (Object) - Required. The new list of added table list
  * Response:
  *         Upon successful request, the route responds with 200 status code
  */
app.put("/:restaurantName/staff/edit/table/:id/", async (req, res) => {
  const tableID = req.params.id;
  const restaurantName = req.params.restaurantName;
  const updateString = `tables.table${tableID}.paid`;

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

/**
  * Purpose:
  *         Create a new employee in the database
  * Endpoint:
  *         PUT  https://us-central1-restaurantqr-73126.cloudfunctions.net/api/:restaurant/staff/edit/addemployee
  *         Note: Replace ":restaurant" in the above route with the restaurant name to add 
  * Request Params:
  *         body (Object) - Required. The new list of added employee list
  * Response:
  *         Upon successful request, the route responds with 200 status code
  */
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

/**
  * Purpose:
  *         Updates employee's data as clock in/out
  * Endpoint:
  *         PUT  https://us-central1-restaurantqr-73126.cloudfunctions.net/api//:restaurant/staff/:clockinout/:eid
  *         Note: Replace ":restaurant" in the above route with the restaurant name to update
  *         Note: Replace ":clockinout" in the above route with the approporiate request (in or out) 
  *         Note: Replace ":eid" in the above route with the employee's eid to update 
  * Request Params:
  *         body (Object) - Required. The new list of updated employee list
  * Response:
  *         Upon successful request, the route responds with 200 status code
  */
app.put("/:restaurant/staff/:clockinout/:eid", async (req, res) => {
  const restaurant = req.params.restaurant;
  const eid = req.params.employee;
  const updateString = `employees`;

  try {
    // adds a new request to the list
    await firestore
      .collection("Restaurant")
      .doc(restaurant)
      .update({
        [updateString]: req.body.employees,
      });
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
  res.status(200).send();
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
    let i = 0;
    while (i < preText.data[0].length) {
      if (i === 0) {
        newSection = preText.data[0][0][0].replace(".", "").trim();
        i++;
        continue;
      }
      const currentItem = preText.data[0][i][0];

      const split = currentItem.split("~");

      const name = split[0].trim();

      let item = split[1];

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
      item = item.replace(/:/g, ".");
      item = item.trim();

      resultsArr.push([name, item !== "***" ? item : ""]);
    }
  }

  return [newSection, resultsArr];
};

const parseMenuV2 = async (sectionName, menuSection, language) => {
  const preStringArray = Object.entries(menuSection).map((item) => {
    // item[0] name of item
    // item[1].description the description

    const preName = item[0].replace(/-/g, " ");
    const noSlash = preName.replace(/\//g, " ");
    const noDashName = noSlash.replace(/&/g, "and");

    if (!item[1].description || item[1].description === "") {
      return `${noDashName} ~ ***`;
    }
    const withoutAnd = item[1].description.replace(/&/g, "and");
    const withoutDash = withoutAnd.replace(/-/g, " ");
    const replacingPeriods = withoutDash.replace(/\./g, ":");

    const newText = `${noDashName} ~ ${replacingPeriods}`;
    return newText;
  });

  const hugeText = preStringArray.join(". ");

  let filteredSectionName = sectionName;
  filteredSectionName = filteredSectionName.replace(/-/g, " ");
  filteredSectionName = filteredSectionName.replace(/&/g, "and");
  filteredSectionName = filteredSectionName.replace(/\//g, " ");

  const [translatedSectionName, allTextArrays] = await translateCombined(
    `${filteredSectionName} . ` + hugeText,
    language
  );

  const objToSend = {};

  objToSend[translatedSectionName] = {};

  allTextArrays.forEach((eachTuple) => {
    objToSend[translatedSectionName][eachTuple[0]] = {};
    objToSend[translatedSectionName][eachTuple[0]].description = eachTuple[1];
    if (sectionName !== "Service Items") {
      objToSend[translatedSectionName][eachTuple[0]].price = Math.random() * 15;
    }
  });

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
      return menuComponent;
    })
  );

  const newMenu = {};

  entireMenu.forEach((eachMenuSectionObj) => {
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

app.get("/Sushi-o/demoqr", async (req, res) => {
  const data = await firestore.collection("Restaurant").doc("Sushi-o").get()

  const tablesObj = data.data().tables;
  const rand = Object.values(tablesObj).filter(table => table.qrcode).map(table => table.qrcode);
  const ranIndx = Math.floor(rand.length * Math.random());

  res.send(rand[ranIndx]);
})

exports.api = functions.https.onRequest(app);
