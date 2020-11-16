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
  // console.log(req.params);
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

// gets requests
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

// gets employees
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


// add a table to the restaurant
app.put("/:restaurantName/staff/edit/table/:id/", async (req, res) => {
  const tableID = req.params.id;
  // const { restaurantName } = req.body;
  const restaurantName = req.params.restaurantName;
  const updateString = `tables.table${tableID}.paid`;
  console.log(updateString)

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


app.post("/translate", async (req, res) => {
  // Inspirtation from Amit Agarwal on https://www.labnol.org/code/19909-google-translate-api

  console.log(req.body);
  const menu = req.body.menu;

  // send a request with ff
  Object.entries(menu).forEach((item) => {
    // item[0]
    // item[1]
  });

  const translatedMenu = {};
  // translate header

  // translate item name
  // translate description

  const bro = [translate(text[0]), translate(text[1])];
  // console.log(req.body.menu);
  // // google's translation api
  // const newUrl =
  //   "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=" +
  //   encodeURI(req.body.text);

  // const translationResponse = JSON.stringify(
  //   (await axios.get(newUrl)).data[0][0][0]
  // );

  // console.log(translationResponse);

  const finalArr = Promise.all(bro);

  res.send(translationResponse);
});

const translate = async (text) => {
  const newUrl =
    "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=" +
    encodeURI(text);

  const translationResponse = JSON.stringify(
    (await axios.get(newUrl)).data[0][0][0]
  );
  return translationResponse;
};

exports.api = functions.https.onRequest(app);

// app.get("/", (req, res) => {
//   res.send("Yoooooo what up customers!");
// });

// // updates a tables request list
// app.put("/table/:id/order", async (req, res) => {
//   const tableID = req.params.id;
//   const { restaurantName } = req.body;
//   const newItem = req.body.request;
//   const updateString = `table${tableID}.requests`;

//   try {
//     // adds a new request to the list
//     await firestore
//       .collection("Restaurant")
//       .doc(restaurantName)
//       .update({
//         [updateString]: firebase.firestore.FieldValue.arrayUnion(newItem),
//       });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send();
//   }
//   res.status(200).send();
// });

// // add all customer endpoints above this comment :)
// exports.customer = functions.https.onRequest(app);

// // Add all of the staff endpoints below this comment :)
// app.get("/", (req, res) => {
//   res.send("Yoooooo what up staff!");
// });

// exports.staff = functions.https.onRequest(app);

// // All multipurpose endpoints are below this comment :)

// app.get("/", (req, res) => {
//   res.send("Yoooooo what up multipurpose");
// });

// app.get("/:restaurant/menu", async (req, res) => {
//   const restaurantName = req.params.restaurant;
//   console.log(req.params);
//   try {
//     const data = await firestore
//       .collection("Restaurant")
//       .doc(restaurantName)
//       .get();
//     res.send(data.data());
//   } catch (error) {
//     res.status(500).send();
//   }
// });

// exports.general = functions.https.onRequest(app);
