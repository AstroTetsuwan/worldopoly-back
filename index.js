// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import config from './env.config';

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const analytics = getAnalytics(app);

const expressApp = require('./functions');

const PORT = process.env.PORT || 3000;

expressApp.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});