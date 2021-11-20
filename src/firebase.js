import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA4I5BO71r9MLh7m9zcsiIxzQcUyNFGjg4",
  authDomain: "snapchat-clone-b4ce3.firebaseapp.com",
  projectId: "snapchat-clone-b4ce3",
  storageBucket: "snapchat-clone-b4ce3.appspot.com",
  messagingSenderId: "260059107941",
  appId: "1:260059107941:web:14a6ccbd5d26d0382a2c8c",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
