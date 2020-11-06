import app from "firebase/app";
import * as config from "./config.json";
import "firebase/firestore";

// Used to access firebase functions
class Firebase {
  constructor() {
    app.initializeApp({
      "apiKey": "AIzaSyAHZaloMASXAoQXMd8YQtVBOrlbk5gC0Cs",
      "authDomain": "restaurantqr-73126.firebaseapp.com",
      "databaseURL": "https://restaurantqr-73126.firebaseio.com",
      "projectId": "restaurantqr-73126",
      "storageBucket": "restaurantqr-73126.appspot.com",
      "messagingSenderId": "1064519003689",
      "appId": "1:1064519003689:web:7951e39b656570cb373638",
      "measurementId": "G-RBEVERQ2RS"
    });


    this.db = app.firestore();
  }

  async getData() {
    console.log("In async getData()");
    const data = this.db.collection("Restaurant").get().then(dat => {
      dat.docs.map(doc => {
        console.log(doc.data())
      })
    });
    return data;
  }

  async postData(incomingData) {
    const data = this.db.collection("Restaurant").doc("test_restaurant_2").update(
      {["menu"]: incomingData}
      )
  }

  async postDataObject(incomingData) {
    const data = this.db.collection("Restaurant").doc("test_restaurant_3").update(
      {["menu"]: incomingData}
      )
  }

  async getRequest() {
    const doc = this.db.collection("Restaurant").doc("test_restaurant_3");
    // const data = doc.get();
    const observer = doc.onSnapshot(docsnapshot => {
      // console.log(`received doc snapshot: ${docsnapshot.data().tables}`);
      // console.log(docsnapshot.data().tables)
      let result = Object.keys(docsnapshot.data().tables).map(key => {
        return [key, docsnapshot.data().tables[key]];
      });
      // console.log(result);
      return result;
    }, err => {
      console.log(`Encountered error: ${err}`);
    });
  }
}

export default new Firebase();
