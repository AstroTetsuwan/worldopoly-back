var admin = require("firebase-admin");
var serviceAccount = require("./firebase-service-account/worldopoly-bbd9e-firebase-adminsdk-bx5fm-4302cbbf9d.json");
const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://worldopoly-bbd9e-default-rtdb.europe-west1.firebasedatabase.app"
})


module.exports = firebaseApp;
