import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Authcontext";
import { db } from "../firebase";
import { ChatContext } from "../context/chatcontext";
function Chats() {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);


  const HandleSelect = (u) =>{
    dispatch({type:"CHANGE_USER", payload: u})
  }

  return (
    <div className="chats ">
      {Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map((chat) => (
        <div className="userchat" key={chat[0]} onClick={()=>HandleSelect(chat[1].userInfo)}>
          <img src={chat[1].userInfo.photoURL} alt="" className="userimg" />
          <div className="userchatInfo">
            <span className="usertxt">{chat[1].userInfo.displayName}</span>
            <span className="fr">{chat[1].lastmessage?.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Chats;
