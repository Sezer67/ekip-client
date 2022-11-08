import { Input, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { gifs, icons } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { MessageType } from "../../redux/types/chat.type";
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
  const socket = io("http://192.168.1.34:8000");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messageEnd, setMessageEnd] = useState<HTMLDivElement | null>(null);
  const [todayFirstMessage, setTodayFirstMessage] = useState<
    MessageType | undefined
  >();

  const userState = useAppSelector((state) => state.user);
  const notificationState = useAppSelector((state) => state.notification);

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
    if (messages && !todayFirstMessage) {
      const currentDate = new Date();
      const todayMessages = messages.filter(
        (m) => new Date(m.date).getTime() > currentDate.setHours(0, 0, 0)
      );
      setTodayFirstMessage(todayMessages[0]);
    }
  }, [messages]);

  useEffect(() => {
    socket.connect();

    socket.on(userState.user.id, (data: MessageType) => {
      console.log("data : ", data);
      setMessages([...messages, data]);
    });

    return () => {
      console.log("return e girdi");
      socket.off("socket-message");
      socket.disconnect();
    };
  }, [socket]);

  if (notificationState.isLoading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <img alt="" src={gifs.ripple} />
      </div>
    );

  return (
    <div className=" h-full w-full rounded-md p-4 overflow-y-auto">
      <div className="h-[70vh] overflow-y-auto flex flex-col">
        {messages &&
          messages.map((msg) => {
            if (todayFirstMessage && todayFirstMessage.id === msg.id) {
              return (
                <>
                  <span className="w-full my-1 text-primary font-bold bg-slate-200 shadow-sm bg-opacity-50 px-5 py-2 rounded-xl text-center">
                    BUGÜN
                  </span>
                  <Message message={msg} key={msg.id} />
                </>
              );
            }
            return <Message message={msg} key={msg.id} />;
          })}
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
