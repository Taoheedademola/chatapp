import React from "react";
import Navbar from "./Navber";
import Searchbar from "./Searchbar";
import Chats from "./chats";
function Sidebar() {
    return(
        <div className="sidebar">
            <Navbar/>
            <Searchbar/>
            <Chats/>
        </div>
    )
}

export default Sidebar