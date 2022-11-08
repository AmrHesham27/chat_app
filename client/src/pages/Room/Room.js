import React, { useContext, useState } from "react";
import Header from "../../components/Header/Header";
import styles from "./Room.module.css";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import AppContext from "../../context/app-context";

function Room() {
  const ctx = useContext(AppContext);
  const { socket } = ctx;
  console.log(socket);
  const { userName } = useSelector((state) => state.user);
  const thisRoom =
    window.location.href.split("/")[window.location.href.split("/").length - 1];

  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const userJoinedRoom = useRef(false);

  const messageInput = useRef();
  const submitMessage = () => {
    const msg = messageInput.current["value"];
    if (msg !== "") socket.emit("chatMessage", msg);
    messageInput.current["value"] = "";
  };

  const scrollRef = useRef();

  useEffect(() => {
    const outputUsers = (users) => {
      setUsers(
        users.map((user, index) => {
          return (
            <div className={styles.user} key={index}>
              <p>{user.userName}</p>
            </div>
          );
        })
      );
    };

    const outputMessage = (message) => {
      const newMessage = (
        <div
          key={Date.now()}
          ref={scrollRef}
          className={
            message.userId === socket.id
              ? styles["message-me"]
              : styles["message"]
          }
        >
          <span className="text-secondary small">Time : {message.time}</span>
          <br />
          <p className="fw-bold">{message.userName}</p>
          <p className="text-break">{message.text}</p>
        </div>
      );
      setMessages([...messages, newMessage]);
    };

    if (!userJoinedRoom.current) {
      socket.emit("joinRoom", { userName, room: thisRoom });
      userJoinedRoom.current = true;
    }

    socket.on("roomUsers", ({ room, users }) => {
      if (room === thisRoom) outputUsers(users);
    });

    socket.on("message", (message) => {
      outputMessage(message);
    });

    scrollRef.current?.scrollIntoView({ beahvior: "smooth" });
  }, [socket, userName, thisRoom, userJoinedRoom, messages]);

  return (
    <>
      <Header />
      <div className={styles.grid}>
        <div className={styles["users-list"]}>
          <h3>Active Users</h3>
          {users}
        </div>

        <div className={styles["messages-container"]}>
          <div className={styles.messages}>
            {messages}
            <div style={{ minHeight: "100px" }}></div>
            <div className={styles.typeMessage}>
              <textarea ref={messageInput} />
              <button onClick={submitMessage}>
                <FontAwesomeIcon icon={faLocationArrow} size="2x" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Room;
