
const firebase = require('firebase');
// const app = firebase.initializeApp({ ... });


// Firebase App (the core Firebase SDK) is always required and must be listed first
// import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
// import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC9gnikfSJ9xK7NY6QtCGtX2reKql7baJ0",
    authDomain: "myretail-d2fe9.firebaseapp.com",
    databaseURL: "https://myretail-d2fe9.firebaseio.com",
    projectId: "myretail-d2fe9",
    storageBucket: "myretail-d2fe9.appspot.com",
    messagingSenderId: "221259177082",
    appId: "1:221259177082:web:9fa76efc28e4235c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

module.exports = db