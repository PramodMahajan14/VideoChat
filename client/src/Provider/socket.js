import { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider = (props) => {
  const socket = useMemo(() => io("http://localhost:8081"), []);
  return (
    <>
      <SocketContext.Provider value={{ socket }}>
        {props.children}
      </SocketContext.Provider>
    </>
  );
};
export default SocketProvider;
