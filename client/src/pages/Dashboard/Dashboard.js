import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import styles from "./Dashboard.module.css";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const { userName } = useSelector((state) => state.user);

  const [error, setError] = useState();

  const roomInput = useRef();

  const enterRoom = () => {
    const roomName = roomInput.current["value"];
    if (roomName === "") setError("please enter room");
    else navigate(`/rooms/${roomName}`);
  };

  return (
    <>
      <Layout>
        <Header />
        <div className={styles.grid}>
          <div className={styles["card-container"]}>
            <div className={styles.card}>
              <h3>welcome {userName}</h3>
              <p>Join Room Now!</p>
              <select name="rooms" ref={roomInput}>
                <option value=""></option>
                <option value="javascript">JavaScript</option>
                <option value="php">PHP</option>
              </select>
              <p className={styles.error}>{error}</p>
              <button onClick={enterRoom}>Enter</button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Dashboard;
