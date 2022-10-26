import React, { useEffect, useState } from "react";
import Chat from "../../components/ChatArea/Chat";
import FollowerCard from "../../components/FollowerCard/FollowerCard";
import bgwp from "../../assets/images/wp1.jpg";
import { roleEnum } from "../../enums";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FollowType } from "../../redux/types/user.types";
import { setNotification } from "../../redux/userSlice/notificationSlice";
import { ChatRoomType, MessageType } from "../../redux/types/chat.type";
import { chatService } from "../../service";
import { Spin } from "antd";

const Follow = () => {
  const [receiverUser, setSelectedUser] = useState<FollowType>();
  const [chatRooms, setChatRooms] = useState<ChatRoomType[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);

  const userState = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getChatRooms = async () => {
      try {
        const { data } = await chatService.getRooms();
        setChatRooms(data);
      } catch (error) {
        dispatch(
          setNotification({
            message: "Hata Oluştu",
            description: "Sohbet Odalarınız Yüklenemedi",
            isNotification: true,
            placement: "top",
            status: "error",
          })
        );
      }
    };

    getChatRooms();
  }, [dispatch]);

  useEffect(() => {
    const getMessagesFromChatRoom = async () => {
      try {
        const { data } = await chatService.getMessagesByRoomId(selectedRoomId!);
        setMessages(data);
      } catch (error) {
        dispatch(
          setNotification({
            message: "Hata Oluştu",
            description: `${receiverUser?.firstName} ile mesajlarınız yüklenemedi.`,
            isNotification: true,
            placement: "top",
            status: "error",
          })
        );
      }
    };
    const createChatRoom = async () => {
      if (receiverUser) {
        try {
          const { data } = await chatService.createRoom({
            id: receiverUser.id,
          });
          debugger;
          setChatRooms([...chatRooms, data]);
          setSelectedRoomId(data.id);
        } catch (error) {}
      }
    };
    if (selectedRoomId) {
      getMessagesFromChatRoom();
    } else {
      createChatRoom();
    }
  }, [selectedRoomId, receiverUser, dispatch]);

  const getChatUserRoomId = (follower: FollowType): string | null => {
    if (userState.user.role === roleEnum.Role.Customer) {
      const roomId = chatRooms.find((room) => room.sellerId.id === follower.id);
      if (roomId) return roomId.id;
    } else {
      // seller user durumu
      const roomId = chatRooms.find(
        (room) => room.customerId.id === follower.id
      );
      if (roomId) return roomId.id;
    }
    return null;
  };

  return (
    <div className="w-full flex flex-row flex-wrap p-3">
      {/* takipçilerin listesi */}
      <div className="w-full md:w-1/2 lg:w-1/3">
        <h3 className="text-primary font-bold text-lg">
          {userState.user.role === roleEnum.Role.Customer
            ? "TAKİP ETTİKLERİM"
            : "TAKİPÇİLERİM"}
        </h3>
        <div className="max-h-[80vh] overflow-y-auto">
          {userState.followers.map((follower) => {
            const roomId = getChatUserRoomId(follower);
            return (
              <FollowerCard
                key={follower.id}
                selectedUser={receiverUser}
                setSelectedUser={setSelectedUser}
                follower={follower}
                roomId={roomId}
                setSelectedRoomId={setSelectedRoomId}
              />
            );
          })}
        </div>
      </div>
      {receiverUser && (
        <div className="w-full p-0  md:px-4 md:w-1/2 lg:w-2/3 rounded-sm">
          <div className="w-full flex flex-row justify-between items-center px-2">
            <h3 className="text-xl text-primary font-bold">
              {receiverUser.firstName.concat(" ", receiverUser.lastName)}
            </h3>
            <button
              onClick={() => setSelectedUser(undefined)}
              className="text-2xl"
            >
              &#10005;
            </button>
          </div>
          <div
            className="w-full h-[80vh] rounded-sm"
            style={{
              backgroundImage: `url(${bgwp})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            {selectedRoomId ? (
              <Chat
                roomId={selectedRoomId}
                receiverUser={receiverUser}
                messages={messages}
                setMessages={setMessages}
              />
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <Spin size="large" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Follow;
