import app from "firebase/app";
import config from "./config.json";
import "firebase/firestore";
import "firebase/auth";

// Used to access firebase functions
class Firebase {
  constructor() {
    app.initializeApp(config);
    this.db = app.firestore();
    this.auth = app.auth();
  }

  async getData() {
    console.log("In async getData()");
    const data = this.db
      .collection("Restaurant")
      .get()
      .then((dat) => {
        dat.docs.map((doc) => {
          console.log(doc.data());
        });
      });
    return data;
  }

  async postData(incomingData) {
    const data = this.db
      .collection("Restaurant")
      .doc("test_restaurant_2")
      .update({ ["menu"]: incomingData });
  }

  async postDataObject(incomingData) {
    const data = this.db
      .collection("Restaurant")
      .doc("test_restaurant_3")
      .update({ ["menu"]: incomingData });
  }

  async getRequest() {
    const doc = this.db.collection("Restaurant").doc("test_restaurant_3");
    // const data = doc.get();
    const observer = doc.onSnapshot(
      (docsnapshot) => {
        // console.log(`received doc snapshot: ${docsnapshot.data().tables}`);
        // console.log(docsnapshot.data().tables)
        let result = Object.keys(docsnapshot.data().tables).map((key) => {
          return [key, docsnapshot.data().tables[key]];
        });
        // console.log(result);
        return result;
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );
  }
}

export default new Firebase();
