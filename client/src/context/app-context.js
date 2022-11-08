import React from "react";

const AppContext = React.createContext({
  socket: null,
  setSocket: (socket) => {},
});

export default AppContext;
