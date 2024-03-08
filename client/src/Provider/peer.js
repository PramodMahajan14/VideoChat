import React, { createContext, useMemo } from "react";

export const PeerContext = createContext(null);
const PeerProvider = (props) => {
  const peer = useMemo(
    () =>
      RTCPeerConnection({
        iceServer: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:global.stun.twilio.com:3478",
            ],
          },
        ],
      }),
    []
  );

  return (
    <>
      <PeerContext.Provider value={{ peer }}>
        {props.children}
      </PeerContext.Provider>
    </>
  );
};

export default PeerProvider;
