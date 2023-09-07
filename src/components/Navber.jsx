import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/Authcontext";

function Navbar() {
    const {currentUser} = useContext(AuthContext)
    return(
        <div className="navber">
            <span className="logo-1">Demo</span>
            <div className="user">
                <img className="img7" src={currentUser.photoURL} alt="" />
                <span>{currentUser.displayName}</span>
                <button onClick={()=> signOut(auth)} className="btnn">logout</button>
            </div>
        </div>
    )
}
export default Navbar