import React, { useEffect, useState } from "react";
import firebase from "firebase/app";

import Message from './Messages'

const Channel = ({ user = null, db = null }) => {
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");

  const { uid, displayName, photoURL } = user;

  useEffect(() => {
    if (db) {
      const unsubscribe = db
        .collection("messages")
        .orderBy("createAt")
        .limit(100)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setMessages(data);
        });
      return unsubscribe;
    }
  }, [db]);

  const handleOnChange = (e) => {
    setNewMessages(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (db) {
      db.collection("messages").add({
        text: newMessages,
        createAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        displayName,
        photoURL
      });
    }
  };

  return (
    <>
      <ul className="test">
        {messages.map((messages) => (
          <li key={messages.id}><Message {...messages}/></li>
        ))}
      </ul>
      <form onSubmit={handleOnSubmit}>
          <input type="text"
          value={newMessages}
          onChange={handleOnChange}
          placeholder="New massage"/>
          <button type="submit" disabled={!newMessages}>Send</button>
      </form>
    </>
  );
};

export default Channel;
