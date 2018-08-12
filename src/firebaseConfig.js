import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyCz7t3dKq3MfSZiWs3n7m8pVeRIZrPGSWA",
    authDomain: "yarnrowscounter.firebaseapp.com",
    databaseURL: "https://yarnrowscounter.firebaseio.com",
    projectId: "yarnrowscounter",
    storageBucket: "",
    messagingSenderId: "197044797693"
  };
firebase.initializeApp(config);
const db = firebase.database();
const auth = firebase.auth()

export {
    db,
    auth
}