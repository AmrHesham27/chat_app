import { Outlet } from "react-router-dom";
import io from "socket.io-client";
import { useEffect } from "react";
import AppContext from "./context/app-context";
import { useContext, useRef } from "react";

function App() {
  const ctx = useRef(useContext(AppContext));

  useEffect(() => {
    const socket = io("http://localhost:4000");
    ctx["current"].setSocket(socket);

    return () => socket.close();
  }, [ctx]);

  return <Outlet />;
}

export default App;
