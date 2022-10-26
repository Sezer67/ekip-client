import { MessageType } from "../../redux/types/chat.type";
import { FollowType } from "../../redux/types/user.types";

export type PropsType = {
  receiverUser: FollowType;
  roomId: string;
  messages: MessageType[];
  setMessages: (messages: MessageType[]) => void;
};
