import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import styles from "./auth.module.css";

const Register = () => {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const fullnameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const registerHandler = (e) => {
    e.preventDefault();
    const userDetail = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      fullName: fullnameRef.current.value,
      email: emailRef.current.value,
      phoneNumber: phoneRef.current.value,
      isAdmin: false,
    };
    console.log(userDetail);
    fetch("http://localhost:5000/register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetail),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((result) => {
        console.log(result);
        localStorage.user = JSON.stringify(result);
        // setTimeout(() => {
        //   localStorage.removeItem("userId");
        // }, 10000);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h1>REGISTER</h1>
        <form className={styles.form} onSubmit={registerHandler}>
          <input
            type="text"
            placeholder="Username"
            required
            ref={usernameRef}
          />
          <input
            type="text"
            placeholder="Password"
            required
            ref={passwordRef}
          />
          <input
            type="text"
            placeholder="Full name"
            required
            ref={fullnameRef}
          />
          <input
            type="text"
            placeholder="Phone number"
            required
            ref={phoneRef}
          />
          <input type="text" placeholder="Email" required ref={emailRef} />

          <button onClick={registerHandler}>Create new account</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
