import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

export function Password() {
    
    const [err, setErr] =useState(false)
    const Handleclick = async (event) => {
        event.preventDefault();
    const email = event.target[0].value;
       await sendPasswordResetEmail(auth, email).then(()=>{
        alert("Done")
       }).catch((error) =>[
        setErr(true)
       ])
    }
  return (
    <div className="reset">
      <p className="resettop">Forget Password</p>
      <form className="resetform" onSubmit={Handleclick}>
        <input className="resetinput" placeholder="Enter your email" type="email" />
        <button className="resetbtn">Submit</button>
        {err && <p>There is an issue</p>}
      </form>
    </div>
  );
}
