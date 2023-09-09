import React, { useContext } from "react";
import Cam from "../img/cam.png"
import Add from "../img/add.png"
import More from "../img/more.png"
import Messages from "./messages";
import Input from "./input";
import { ChatContext } from "../context/chatcontext";

function Chat() {
  const { data } = useContext (ChatContext);

    return(
        <div className="chat-1">
            <div className="openinfo">
                <span>{data.user?.displayName}</span>
                <div className="openicons">
                    <img src={Cam} alt="" />
                    <img src={Add} alt="" />
                    <img src={More } alt="" />
                </div>
            </div>
            <Messages/>
            <Input/>
        </div>
    )
}


export default Chat