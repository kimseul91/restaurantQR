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

app.get("/", (req, res) => {
  res.send("Yoooooo what up customers!");
});

// updates a tables request list
app.put("/customer/table/:id/order", async (req, res) => {
  const tableID = req.params.id;
  const { restaurantName } = req.body;
  const newItem = req.body.request;
  const updateString = `table${tableID}.requests`;

  try {
    // adds a new request to the list
    await firestore
      .collection("Restaurant")
      .doc(restaurantName)
      .update({
        [updateString]: firebase.firestore.FieldValue.arrayUnion(newItem),
      });
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
  res.status(200).send();
});

app.get("/:restaurant/menu", async (req, res) => {
  const restaurantName = req.params.restaurant;
  console.log(req.params);
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

app.get("/:restaurant/liverequest", async (req, res) => {
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
})

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
