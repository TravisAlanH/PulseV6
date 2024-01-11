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
  sendSignInLinkToEmail,
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

async function EmailSignIn(email) {
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    // This must be true.
    handleCodeInApp: true,
    url: "startling-arithmetic-d3b021.netlify.app",
    // dynamicLinkDomain: "startling-arithmetic-d3b021.netlify.app",
  };

  const auth = getAuth();
  await sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      // window.localStorage.setItem('emailForSignIn', email);
      // ...
      console.log("EmailSignIn");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
    });
}

async function VerificationEmail(cred) {
  console.log(cred);
  console.log("VerificationEmail");
  await sendEmailVerification(cred.currentUser)
    .then(() => {})
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  UserSignOut(auth);
}

async function sendNewVerificationEmail(email) {
  console.log("sendNewVerificationEmail");
  auth.generateEmailVerificationLink(email);
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
    .then((userCredential) => {
      VerificationEmail(userCredential);
      console.log(userCredential);
      console.log("Document successfully written!");
    })
    .then(() => {
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
  console.log(JSON.stringify(data));
  if (docSnap.exists()) {
    await updateDoc(docRef, {
      LocationsList: arrayUnion(JSON.stringify(data)),
    });
  }
}

async function updateLocationsList(newLocationsData) {
  const db = getFirestore(app);
  const docRef = doc(db, "users", auth.currentUser.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("docRef", docRef);
    console.log("updateLocationsList", newLocationsData);
    // await setDoc(docRef, {
    //   LocationsList: newLocationsData,
    // });
    // await updateDoc(docRef, {
    //   LocationsList: newLocationsData,
    // });
  }
}

async function replaceLocationWithUpdate(newLocationData) {
  let UUID = newLocationData.Current.DataBaseUUID;
  // use array-contains to delete this data from the db
  const db = getFirestore(app);
  const docRef = doc(db, "users", auth.currentUser.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let removed;
    let LocationsList = docSnap.data().LocationsList;
    for (let i = 0; i < LocationsList.length; i++) {
      let LocationListIndexData = LocationsList[i];
      if (typeof LocationListIndexData === "string") LocationListIndexData = JSON.parse(LocationListIndexData);
      if (LocationListIndexData.Current.DataBaseUUID === UUID) {
        removed = LocationsList[i];
        await updateDoc(docRef, {
          LocationsList: arrayRemove(removed),
        }).then(() => {
          updateDoc(docRef, {
            LocationsList: arrayUnion(JSON.stringify(newLocationData)),
          });
        });
      }
    }
  }
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

export {
  EmailSignIn,
  sendNewVerificationEmail,
  replaceLocationWithUpdate,
  signup,
  signIn,
  UserSignOut,
  addToLocations,
  changeLocationAtIndex,
  updateLocationsList,
  getData,
  auth,
  VerificationEmail,
};
