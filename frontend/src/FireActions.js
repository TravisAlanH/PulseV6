import "./App.css";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import app from "./firebase";
import { arrayUnion, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";

const auth = getAuth(app);

const getData = () => {
  if (!auth.currentUser) {
    console.log("no user");
    return;
  }
  const db = getDatabase(app);

  const dbRef = ref(db);
  onValue(dbRef, (snapshot) => {
    console.log(snapshot.val().rows[0]);
  });
};

function isValidEmail(email) {
  const testAgainst = process.env.REACT_APP_AUTHORIZED_EMAIL_DOMAIN;
  const emailDomain = email.split("@")[1];
  if (emailDomain === testAgainst) {
    return true;
  }
  console.log("invalid email");
  return false;
}

function signup(user) {
  if (!isValidEmail(user.email)) return;
  const db = getFirestore(app);
  console.log(db);
  createUserWithEmailAndPassword(auth, user.email, user.password, user.phoneNumber)
    .then((userCredential) => {
      return setDoc(doc(db, "users", userCredential.user.uid), {
        Email: user.email,
        FullName: user.FullName,
        LocationsList: [],
      });
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      // ..
    });
}

// useEffect(() => {
//   setLoading(true);
//   const data = async () => {
//     const db = getFirestore(app);
//     const docRef = doc(db, "users", user.uid);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       setLocationData(docSnap.data().LocationsList);
//     }
//     setTimeout(() => {
//       setLoading(false);
//     }, 500);
//     console.log(locationData);
//   };

//   data().catch((error) => {
//     setLoading(false);
//     console.error("Error adding document: ", error);
//   });
// }, [count, user.uid, reset]);

// console.log(count);

async function addToLocations(user, data) {
  const db = getFirestore(app);
  let currentLocationList = [];
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    currentLocationList = [...docSnap.data().LocationsList, data];
  }
  await updateDoc(doc(db, "users", user.uid), {
    LocationsList: arrayUnion(...currentLocationList),
  }).catch((error) => {
    console.error("Error adding document: ", error);
  });
}

async function changeLocationAtIndex(index, data, user) {
  const db = getFirestore(app);
  let currentLocationList = [];
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    currentLocationList = docSnap.data().LocationsList;
  }
  //! need to get the data before updating so i am only updating what i need
  // currentLocationList[index] = { name: data, age: 30, location: "Portland", count: count };
  await setDoc(doc(db, "users", user.uid), {
    LocationsList: arrayUnion(...currentLocationList),
  }).catch((error) => {
    console.error("Error adding document: ", error);
  });
}

function UserSignOut() {
  if (!auth.currentUser) {
    console.log("no user");
    return;
  }
  signOut(auth)
    .then((response) => {
      return response;
      // Sign-out successful.
      console.log("Sign out");
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}

function signIn(user) {
  signInWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
      // Signed in
      console.log(userCredential);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}

export { signup, signIn, UserSignOut, addToLocations, changeLocationAtIndex, getData, auth };
