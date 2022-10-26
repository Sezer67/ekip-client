import moment from "moment";
import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { PropsType } from "./message.config";

const Message: React.FC<PropsType> = ({ message }) => {
  const userState = useAppSelector((state) => state.user);

  return (
    <div
      className={`w-full my-1 flex flex-row ${
        message.senderId.id === userState.user.id
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`relative p-1 px-2 pr-10 rounded-md bg-light max-w-[75%]`}
      >
        <span className="text-sm font-medium text-primary">
          {message.message}
        </span>
        <span className="absolute text-[0.65rem] text-thirdy right-1 bottom-1">
          {moment(message.date).format("HH:mm")}
        </span>
      </div>
    </div>
  );
};

export default Message;
