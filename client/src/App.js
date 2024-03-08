import "./App.css";
import { Routes, Route } from "react-router-dom";
import SocketProvider from "./Provider/socket";
import Home from "./Pages/Home";
import Room from "./Pages/Room";
function App() {
  return (
    <div className="App">
      <SocketProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:roomId" element={<Room />} />
        </Routes>
      </SocketProvider>
    </div>
  );
}

export default App;
