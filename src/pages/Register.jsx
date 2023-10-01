import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate= useNavigate()
  const [err, setErr] = useState(false);

  const [loader,  setLoader]= useState(false)


  const HandleSubmit = async (event) => {
    event.preventDefault();
    const displayName = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const file = event.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName); 

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      uploadTask.on(

        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });


            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid) ,{})
            navigate("/")
          }); 
        }
      );
    } catch (err) {
      setErr(true);
      console.log(err);
    }
    setLoader(true)
  };

  return (
    <div className="formcontainer">
      <div className="formwrapper">
        <span className="logo">Demo Chat</span>
        <span className="title">Register</span>
        <form className="form" onSubmit={HandleSubmit}>
          <input className="input" type="text" placeholder="Enter your name" />
          <input
            className="input"
            type="email"
            placeholder="Enter your email"
          />
          <input
            className="input"
            type="password"
            placeholder="Enter 6 digit password or more"
          />
          <input className="input file" type="File" id="file" />
          <label htmlFor="file" className="avater">
            <img src={Add} alt="" className="avaterimg" />
            <span className="avatertext">Add an avater</span>
          </label>

          <button className="btn">{loader? (<div className="spinner"></div>) :"Sign up"}</button>
          {err && <span className="red">something went wrong</span>}
        </form>
        <p className="p">You do have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default Register;
