import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../Provider/socket";
import { usePeer } from "../Provider/peer";
import ReactPlayer from "react-player";

const Room = () => {
  const { socket } = useSocket();
  const {
    peer,
    createOffer,
    createAnswere,
    setRemoteAns,
    sendStream,
    remoteStream,
  } = usePeer();
  const [myStream, setMyStrem] = useState(null);
  const [remoteEmail, setRemoteEmail] = useState();

  const handleNewUserJoined = useCallback(
    async (data) => {
      const { email } = data;
      const offer = await createOffer();
      socket.emit("call-user", { email, offer });
      setRemoteEmail(email);
    },
    [createOffer, socket]
  );

  const handleIncommingCall = useCallback(
    async (data) => {
      const { from, offer } = data;
      const ans = await createAnswere(offer);
      socket.emit("call-accept", { email: from, ans });
      setRemoteEmail(from);
    },
    [createAnswere, socket]
  );

  const handleCallAccepted = useCallback(
    async (data) => {
      const { ans } = data;
      console.log("call got accepted", ans);
      await setRemoteAns(ans);
    },
    [setRemoteAns]
  );

  const getUserMediaStream = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    setMyStrem(stream);
  }, []);

  const handleNegotiationneeded = useCallback(() => {
    const localOffer = peer.localDescription;
    socket.emit("call-user", { email: remoteEmail, offer: localOffer });
  }, [peer.localDescription, remoteEmail, socket]);

  useEffect(() => {
    socket.on("user-joined", handleNewUserJoined);
    socket.on("incomming-call", handleIncommingCall);
    socket.on("call-accepted", handleCallAccepted);
    return () => {
      socket.off("user-joined", handleNewUserJoined);
      socket.off("incomming-call", handleIncommingCall);
      socket.off("call-accepted", handleCallAccepted);
    };
  }, [socket, handleNewUserJoined, handleIncommingCall, handleCallAccepted]);

  useEffect(() => {
    peer.addEventListener("negotiationneeded", handleNegotiationneeded);

    return () => {
      peer.removeEventListener("negotiationneeded", handleNegotiationneeded);
    };
  }, [handleNegotiationneeded, peer]);

  useEffect(() => {
    getUserMediaStream();
  }, [getUserMediaStream]);
  return (
    <>
      <div className="container">
        <h1>Rooom Page</h1>
        <h1>Your Connected to {remoteEmail}</h1>
        <button className="primary-btn" onClick={(e) => sendStream(myStream)}>
          send my video
        </button>
        <ReactPlayer url={myStream} playing muted />
        <ReactPlayer url={remoteStream} playing />
      </div>
    </>
  );
};
export default Room;
