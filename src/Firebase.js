import app from "firebase/app";
import * as config from "../config.json";
import "firebase/auth";

// Used to access firebase functions
class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }
}

export default new Firebase();
