import firebase from "firebase/app";
import "firebase/firestore"; // Import Firestore if you're using it

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyByF5M5FETsEmXi8K9npn1m3C0gQzvFGRE",
    authDomain: "newshub-01.firebaseapp.com",
    projectId: "newshub-01",
    storageBucket: "newshub-01.appspot.com",
    messagingSenderId: "295545106575",
    appId: "1:295545106575:web:b13df9095d2264b53480fa",
    measurementId: "G-FFZ7DDV0L0"
  };
  

firebase.initializeApp(firebaseConfig);

//firebase = getAnalytics(app);

export default firebase;

