import React, { useState, useEffect } from "react";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import "./App.css";

import Button from "./components/Button";
import Channel from './components/Channel'

firebase.initializeApp({
  apiKey: "AIzaSyAW4AMaRDQF6P_cFfYzSvS3ePHjOuInh6g",
  authDomain: "chatwebreact.firebaseapp.com",
  projectId: "chatwebreact",
  storageBucket: "chatwebreact.appspot.com",
  messagingSenderId: "84099179076",
  appId: "1:84099179076:web:c8ebdbc41cc671ee5fd211",
  measurementId: "G-4E9QXQZFF0",
});

const auth = firebase.auth();
const db = firebase.firestore();

function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      if (initializing) {
        setInitializing(false);
      }
    });

    //Cleaup subscription
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    try{
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  }

  if (initializing) return "Loading...";

  return (
    <div className="App">
      {user ? (
        <>
          <Button onClick={signOut}>Sign out</Button>
          "Welcome"
          <Channel user={user} db={db}/>
        </>
      ) : (
        <Button onClick={signInWithGoogle}>Sign in with Google</Button>
      )}
    </div>
  );
}

export default App;
