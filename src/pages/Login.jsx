import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
function Login() {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);

  
  const HandleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="formcontainer">
      <div className="formwrapper">
        <span className="logo">Demo</span>
        <span className="title">Login</span>
        <form className="form" onSubmit={HandleSubmit}>
          <input
            className="input"
            type="email"
            placeholder="Enter your email"
          />
          <input
            className="input"
            type="password"
            placeholder="Enter Your  password"
          />
          <button className="btn">Sign In</button>
        </form>
        {err && <span className="red">something went wrong</span>}
        <p className="p">
          You don't have an account?<Link to="/register">Register</Link>{" "}
        </p>
        <Link to="/passwordreset">
          <button className="ntb">forget password</button>
        </Link>
      </div>
    </div>
  );
}
export default Login;
