import styles from "./Login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/userSlice";
import { useState, useRef } from "react";
import Layout from "../../components/Layout/Layout";

function Login() {
  const dispatch = useDispatch();

  const userNameInput = useRef();
  const [error, setErorr] = useState();

  const [state1, setState1] = useState();

  const [state2, setState2] = useState();

  const [state3, setState3] = useState();

  function x1() {
    if (!state1) setState1(1);
    console.log(state1, state2, state3);
  }

  function x2() {
    if (!state2) setState2(2);
    console.log(state1, state2, state3);
  }

  function x3() {
    if (!state3) setState3(3);
    console.log(state1, state2, state3);
  }

  x1();

  x2();

  x3();

  const handleLogin = (event) => {
    event.preventDefault();
    const userName = userNameInput.current["value"];

    if (userName === "") setErorr("Name can not be empty.");
    else if (userName.length < 5)
      setErorr("Name should be at least 5 characters.");
    else dispatch(userActions.loginUser(userName));
  };

  return (
    <Layout>
      <div className={styles.grid}>
        <div className={styles["card-container"]}>
          <div className={styles.card}>
            <h1 className={styles.header}>Login</h1>
            <Form onSubmit={handleLogin} className={styles.form}>
              <div className={styles["input-group"]}>
                <input
                  ref={userNameInput}
                  type="text"
                  placeholder="Enter your Name"
                />
              </div>
              <p className={styles.error}>{error}</p>

              <button type="submit">Login</button>
            </Form>

            <div className={styles["social-sign"]}>
              <p>Or sign up using</p>
              <div className={styles.icons}>
                <FontAwesomeIcon icon={faFacebook} color="#4267B2" />
                <FontAwesomeIcon icon={faGoogle} color="#DB4437" />
                <FontAwesomeIcon icon={faTwitter} color="#1DA1F2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
