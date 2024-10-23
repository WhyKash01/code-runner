import { useEffect, useState } from "react";
import { useSocket } from "./SocketComponent";

const ChatDisplay = () => {
  const { socket, isConnected } = useSocket();
  const [messages, setMessages] = useState<string[]>(["asda", "asd"]);

  useEffect(() => {
    if (socket && isConnected) {
      socket.on("event:message", (message: string) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.off("event:message");
      };
    }
  }, [socket, isConnected]);

  return (
    <div>
      <h2>Chat Messages</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatDisplay;
