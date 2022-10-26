type UserChatType = {
  id: string;
  firstName: string;
  lastName: string;
  email: String;
};
export type ChatRoomType = {
  id: string;
  customerId: UserChatType;
  sellerId: UserChatType;
};

export type MessageType = {
  id: string;
  message: string;
  date: Date;
  receiverId: UserChatType;
  senderId: UserChatType;
};

export type ChatStateType = {
  chatRooms: ChatRoomType[];
  selectedRoom: {
    id: string;
    messages: MessageType[];
  };
};

export type SelectRoomPayloadType = {
  id: string;
  messages: MessageType[];
};
