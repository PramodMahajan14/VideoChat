import React, { useEffect } from "react";
import { useSocket } from "../Provider/socket";

const Room = () => {
  const { socket } = useSocket();

  const handleNewUserJoined = (data) => {
    const { email } = data;
    console.log("new user joined", email);
  };
  useEffect(() => {
    socket.on("user-joined", handleNewUserJoined);
  }, [socket]);
  return (
    <>
      <div className="container">
        <h1>Rooom Page</h1>
      </div>
    </>
  );
};
export default Room;
