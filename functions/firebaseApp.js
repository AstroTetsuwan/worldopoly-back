var admin = require("firebase-admin");
const config = require("./config");
const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(config.FIREBASE_SERVICE_ACCOUNT),
  databaseURL: config.FIREBASE_DATABASE_URL
})

const database = firebaseApp.database();

module.exports = {
  firebaseApp,
  database
};
