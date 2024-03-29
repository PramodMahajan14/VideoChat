import { useCallback, useEffect, useState } from "react";
import React, { useSocket } from "../Provider/socket";
import { useNavigate } from "react-router-dom";
import { VideoCameraAddOutlined } from "@ant-design/icons";
import Navbar from "../Components/Navbar";

const Home = () => {
  const [email, setemail] = useState("");
  const [roomId, setroomId] = useState("");
  const { socket } = useSocket();
  const navigate = useNavigate();

  const handleJoinedRoom = useCallback(
    ({ roomId }) => {
      navigate(`/room/${roomId}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("joined-room", handleJoinedRoom);
    return () => {
      socket.off("joined-room", handleJoinedRoom);
    };
  }, [socket]);

  const handleJoinRoom = () => {
    socket.emit("join-room", { email, roomId });
  };
  return (
    <>
      <Navbar />
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="form-container">
              <div className="text-info">
                <h1>Video calls with anyone, anywhere</h1>
                <p>
                  Google meet provide secure, easy to use video calls and
                  meeting for everyone, on any device
                </p>
              </div>

              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  id=""
                  placeholder="mail@example.com"
                />
              </div>

              <div className="form-group">
                <label for="room-code">Room Code</label>
                <input
                  type="text"
                  class="form-control"
                  value={roomId}
                  onChange={(e) => setroomId(e.target.value)}
                  id=""
                  placeholder="f78-rurj4-klqpQl-dk"
                />
              </div>

              <div class="d-grid gap-2 col-4 mx-auto mt-4">
                <button
                  class="btn btn-primary d-flex align-items-center "
                  type="button"
                  onClick={handleJoinRoom}
                >
                  <VideoCameraAddOutlined className="v-icon" /> Invite your
                  friends
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-12 msg-box">
            <div
              class="bs-callout bs-callout-info"
              id="callout-xref-input-group"
            >
              <h4>Input groups</h4>
              <p>To add and remove the more text fields into a form block</p>
            </div>
          </div>
          <div class="col-md-6">
            <div className="design-content">
              <h1>djh</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
