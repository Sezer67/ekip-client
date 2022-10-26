import { AxiosPromise } from "axios";
import { axiosInstance } from "../axios.util";
import { api_url } from "../configs/url.config";
import { ChatRoomType, MessageType } from "../redux/types/chat.type";
import { SendMessageFormType } from "../types/chat-service.type";

export const createRoom = (data: {
  id: string;
}): AxiosPromise<ChatRoomType> => {
  return axiosInstance.post(`${api_url}/chat-room`, data);
};

export const getRooms = (): AxiosPromise<ChatRoomType[]> => {
  return axiosInstance.get(`${api_url}/chat-room/@me`);
};

export const sendMessage = (
  data: SendMessageFormType
): AxiosPromise<MessageType> => {
  return axiosInstance.post(`${api_url}/message/send`, data);
};

export const getMessagesByRoomId = (
  id: string
): AxiosPromise<MessageType[]> => {
  return axiosInstance.get(`${api_url}/message/room/${id}`);
};
