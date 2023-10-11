// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// import { getDatabase, ref, set } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

// const RealTimeDB = getDatabase();

// ref
// const dbRef = ref(RealTimeDB);

// set
// set(dbRef, {
//   name: "Travis",
//   age: 30,
//   location: "Portland",
// });

// collection ref

const colFef = collection(db, "books");

// get collection data
getDocs(colFef).then((snapshot) => {
  snapshot.docs.forEach((doc) => {
    console.log(doc.data());
  });
});

export default app;
