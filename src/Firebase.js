import app from "firebase/app";
import config from "./config.json";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

// Used to access firebase functions
class Firebase {
  constructor() {
    app.initializeApp(config);
    this.db = app.firestore();
    this.auth = app.auth();
    this.storage = app.storage();
  }

  async getData() {
    const data = this.db
      .collection("Restaurant")
      .get()
      .then((dat) => {
        dat.docs.map((doc) => {
          return 0;
        });
      });
    return data;
  }

  async postData(incomingData) {
    await this.db
      .collection("Restaurant")
      .doc("Pizza Palace")
      .update({ menu: incomingData });
  }

  async postDataObject(incomingData) {
    await this.db
      .collection("Restaurant")
      .doc("Snoopy's Hot Dogs")
      .update({ menu: incomingData });
  }

  async getRequest() {
    const doc = this.db.collection("Restaurant").doc("test_restaurant_3");
    doc.onSnapshot(
      (docsnapshot) => {
        let result = Object.keys(docsnapshot.data().tables).map((key) => {
          return [key, docsnapshot.data().tables[key]];
        });
        return result;
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );
  }
}

export default new Firebase();
