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
import { arrayUnion, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";

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
// function isValidEmail(email) {
//   const testAgainst = process.env.REACT_APP_AUTHORIZED_EMAIL_DOMAIN;
//   const emailDomain = email.split("@")[1];
//   if (emailDomain === testAgainst) {
//     return true;
//   }
//   console.log("invalid email");
//   return false;
//   if (!isValidEmail(user.email)) return;
// }

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

async function addToLocations(user, data, reload) {
  try {
    const db = getFirestore(app);
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const currentLocationList = [...docSnap.data().LocationsList, data];
      await updateDoc(docRef, {
        LocationsList: arrayUnion(...currentLocationList),
      });
      return currentLocationList;
    } else {
      console.error("User document not found!");
    }
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

async function changeLocationAtIndex(ChangeIndex, item, user) {
  try {
    const db = getFirestore(app);
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const currentLocationList = docSnap.data().LocationsList.slice(); // Create a shallow copy of the array

      // Update the specific index with new data
      currentLocationList[ChangeIndex] = item;

      // Update the document in Firestore
      await setDoc(docRef, {
        LocationsList: currentLocationList,
      });

      setTimeout(() => {
        return false;
      }, 500);
      console.log("Location updated successfully!"); // Log the success message
    } else {
      console.error("User document not found!");
    }
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error; // Re-throw the error to handle it in the calling function if necessary
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
