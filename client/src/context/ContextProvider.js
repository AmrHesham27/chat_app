import AppContext from "./app-context";
import { useState } from "react";

const CartProvider = (props) => {
  const [socket, setSocket] = useState(false);

  const appContext = {
    socket,
    setSocket: (newSocket) => setSocket(newSocket),
  };

  return (
    <AppContext.Provider value={appContext}>
      {props.children}
    </AppContext.Provider>
  );
};

export default CartProvider;
