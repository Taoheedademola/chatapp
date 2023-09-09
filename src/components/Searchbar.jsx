import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { db } from "../firebase";
import { AuthContext } from "../context/Authcontext";
import img from "../img/srch.png"

function Searchbar() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(null);

  const { currentUser } = useContext(AuthContext);

  const HandleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const HandleKeyDown = (e) => {
    e.code === "Enter" && HandleSearch();
  };
  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const HandleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "newChats", combinedId));

      if (!res.exists()) {
        //create a chat in shats collection
        await setDoc(doc(db, "newChats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {}
    setUser(null);
    setUsername("");
  };
  return (
    <div className="search">
      <div className="searchform">
        <input
          type="text"
          className="inp"
          placeholder="Find a user"
          onKeyDown={HandleKeyDown}
          onChange={handleChange}
          value={username}
        />
        <img src={img} className="srch" onClick={HandleSearch} alt="img" />
      </div>
      {err && <span>user not found</span>}
      {user && (
        <div className="userchat" onClick={HandleSelect}>
          <img src={user.photoURL} alt="" className="userimg" />
          <div className="userchatInfo">
            <span className="usertxt">{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
}
export default Searchbar;
