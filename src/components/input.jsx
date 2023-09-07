import React, { useContext, useState } from "react";
// import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { ChatContext } from "../context/chatcontext";
import { AuthContext } from "../context/Authcontext";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
// import { V4 as uuid } from "uuid";
import {  v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
function Input() {
  const [text, setText] = useState();
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const HandleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {
          
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "newChats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "newChats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    setText("")
    setImg(null)

    await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId+ ".lastmessage"]:{
            text,
        },
        [data.chatId+".date"]:serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId+ ".lastmessage"]:{
            text,
        },
        [data.chatId+".date"]:serverTimestamp(),
    })
  };
  return (
    <div className="inpt">
        
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
        value={text}
      />
      <div className="send">
        <img className="sendimg" src={Attach} alt="" />
        <input
          type="file"
          onChange={(e) => setImg(e.target.files[0])}
          style={{ display: "none" }}
          id="file"
          
        />
        {/* <label htmlFor="file">
          <img className="sendimg" src={Img} alt="" />
        </label> */}
        <button onClick={HandleSend}>send</button>
      </div>
    </div>
  );
}

export default Input;
