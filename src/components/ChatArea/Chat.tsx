import { Input, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { icons } from "../../constants";
import { useAppDispatch } from "../../redux/hooks";
import { setNotification } from "../../redux/userSlice/notificationSlice";
import { chatService } from "../../service";
import Message from "../Message/Message";
import { PropsType } from "./chat.config";

const Chat: React.FC<PropsType> = ({
  receiverUser,
  roomId,
  messages,
  setMessages,
}) => {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messageEnd, setMessageEnd] = useState<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();

  const scrollToBottom = () => {
    messageEnd?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (!(message.trim().length < 1)) {
      setLoading(true);
      try {
        const { data } = await chatService.sendMessage({
          chatRoomId: roomId,
          message: message.trim(),
          receiverId: receiverUser.id,
        });

        setMessages([...messages, data]);
        setMessage("");
      } catch (error) {
        dispatch(
          setNotification({
            message: "Hata Oluştu",
            description: "Mesajınız gönderilemedi",
            placement: "top",
            isNotification: true,
            status: "error",
          })
        );
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className=" h-full w-full rounded-md p-4 overflow-y-auto">
      <div className="h-[70vh] overflow-y-auto flex flex-col">
        {messages.map((msg) => (
          <Message message={msg} key={msg.id} />
        ))}
        <div
          style={{ float: "left", clear: "both" }}
          ref={(el) => setMessageEnd(el)}
        />
      </div>
      <div className="w-full h-[6vh] flex flex-row justify-between items-center">
        <Input
          className="!w-[calc(100%-50px)] py-4"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        {loading ? (
          <Spin />
        ) : (
          <div
            onClick={sendMessage}
            className="w-11 h-11 flex justify-center items-center  rounded-full cursor-pointer"
          >
            <img alt="send" src={icons.send} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
