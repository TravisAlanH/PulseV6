import "./App.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserSessionPersistence,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import app from "./firebase";
import { arrayRemove, arrayUnion, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";

const auth = getAuth(app);

async function getData() {
  const auth = getAuth();
  if (!auth.currentUser) {
    console.log("No user authenticated");
    return null;
  }

  const db = getDatabase();
  const dbRef = ref(db);

  return new Promise((resolve, reject) => {
    onValue(
      dbRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          console.log(data.rows);
          resolve(data.rows);
        } else {
          console.log("No data available");
          resolve(null);
        }
      },
      (error) => {
        console.error("Error fetching data:", error);
        reject(error);
      }
    );
  });
}

function VerificationEmail() {
  sendEmailVerification(auth.currentUser)
    .then(() => {
      // Email verification sent!
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      // ...
    });
}

function signup(user) {
  setPersistence(auth, browserSessionPersistence);
  const db = getFirestore(app);

  createUserWithEmailAndPassword(auth, user.email, user.password, user.phoneNumber)
    .then((userCredential) => {
      // Set the display name for the user
      return updateProfile(userCredential.user, {
        displayName: user.FullName, // Assuming FullName is the display name
      }).then(() => userCredential);
    })
    .then((userCredential) => {
      // Now you can use userCredential to access the user's properties
      return setDoc(doc(db, "users", userCredential.user.uid), {
        Email: user.email,
        FullName: user.FullName,
        LocationsList: [],
      });
    })
    .then(() => {
      VerificationEmail();
      console.log("Document successfully written!");
      UserSignOut(auth);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      // Handle error
    });
}

async function addToLocations(user, data) {
  console.log("addToLocations", data);
  const db = getFirestore(app);
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);
  console.log(data);
  if (docSnap.exists()) {
    await updateDoc(docRef, {
      LocationsList: arrayUnion(data),
    });
  }

  // try {
  //   const db = getFirestore(app);
  //   const docRef = doc(db, "users", user.uid);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     const currentLocationList = [...docSnap.data().LocationsList, data];
  //     await updateDoc(docRef, {
  //       LocationsList: arrayUnion(JSON.stringify(...currentLocationList)),
  //     });
  //     return currentLocationList;
  //   } else {
  //     console.error("User document not found!");
  //   }
  // } catch (error) {
  //   console.error("Error updating document: ", error);
  // }
}

async function changeLocationAtIndex(ChangedItem, fullState, user) {
  console.log("ChangeLocationAtIndex", fullState);
  console.log(user);
  const db = getFirestore(app);
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    await updateDoc(docRef, {
      LocationsList: arrayRemove(ChangedItem),
    });
    await updateDoc(docRef, {
      LocationsList: arrayUnion(fullState),
    });
  }
}

export async function removeFromLocationList(ItemToRemove, user) {
  const db = getFirestore(app);
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    await updateDoc(docRef, {
      LocationsList: arrayRemove(ItemToRemove),
    });
  }
}

function UserSignOut(auth) {
  if (!auth.currentUser) {
    console.log("no user");
    return;
  }
  signOut(auth)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}

function signIn(user) {
  setPersistence(auth, browserSessionPersistence);
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

export { signup, signIn, UserSignOut, addToLocations, changeLocationAtIndex, getData, auth, VerificationEmail };
