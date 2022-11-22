import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: `${process.env.REACT_APP_FIREBASE_authDomain}`,
  projectId: `${process.env.REACT_APP_FIREBASE_projectId}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_storageBucket}`,
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_messagingSenderId}`,
  appId: `${process.env.REACT_APP_FIREBASE_appId}`,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export const GoogleSignIn = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.log(error.message)
  }
}

export const signOutUser = async () => {
   try {
     await signOut(auth);
   } catch (error) {
     console.log(error.message);
   }
}

export const manageUsers = async (userAuth, otherprops) => {
  if (!userAuth) return;

  const addDocRef = doc(db, 'users', userAuth.uid);
  const getSnap = await getDoc(addDocRef);

  if(!getSnap.exists()){
    const { displayName, email } = userAuth;
    const createdDate = new Date();

    try {
      await setDoc(addDocRef, {displayName, email, createdDate, ...otherprops});
    } catch (error) {
      console.log(error.message)
    }
  }else{
    console.log('user already exist')
  }

  return addDocRef;
}