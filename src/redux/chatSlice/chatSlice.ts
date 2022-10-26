import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ChatRoomType,
  ChatStateType,
  SelectRoomPayloadType,
} from "../types/chat.type";

const chat: ChatStateType = {
  chatRooms: [],
  selectedRoom: {
    id: "",
    messages: [],
  },
};

const chatSlice = createSlice({
  name: "chat",
  initialState: chat,
  reducers: {
    setChatRooms: (state, action: PayloadAction<ChatRoomType[]>) => {
      state.chatRooms = action.payload;
    },
    setSelectedRoom: (state, action: PayloadAction<SelectRoomPayloadType>) => {
      state.selectedRoom.id = action.payload.id;
      state.selectedRoom.messages = action.payload.messages;
    },
  },
});

export default chatSlice.reducer;
export const { setChatRooms, setSelectedRoom } = chatSlice.actions;
