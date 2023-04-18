import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("https://chatserver-kp.azurewebsites.net"); //The url of the deployed server-side

function App() {
  const [username] = useState("User"+ randomNumber(1, 999));
  const [room] = useState("1");
  const [showChat, setShowChat] = useState(false);

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <button onClick={joinRoom}>Join</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;