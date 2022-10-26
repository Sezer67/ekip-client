import React from "react";
import { icons } from "../../constants";
import { PropsType } from "./follower-card.config";

const FollowerCard: React.FC<PropsType> = ({
  follower,
  selectedUser,
  setSelectedUser,
  roomId,
  setSelectedRoomId,
}) => {
  return (
    <div
      onClick={() => {
        setSelectedUser(follower);
        setSelectedRoomId(roomId);
      }}
      className="w-full h-[90px] mb-5 px-4 bg-white rounded-md cursor-pointer"
    >
      <div className="w-full h-full flex flex-row justify-between items-center">
        <div className="w-full h-full flex flex-row items-center">
          <div>
            <img
              src={
                follower.profilePicture ? follower.profilePicture : icons.user
              }
              alt=""
              className="w-12 h-12 rounded-full object-cover shadow-md"
            />
          </div>
          <div className="flex flex-col ml-5">
            <span className="text-primary text-base drop-shadow-xl font-semibold">
              {follower.firstName.concat(" ", follower.lastName)}
            </span>
            <span className="text-thirdy text-sm">
              {roomId ? "mesajlaşmaya devam et..." : "mesajlaşma başlat..."}
            </span>
          </div>
        </div>
        {selectedUser?.id === follower.id && (
          <div className="">
            <img
              alt="icon"
              src={icons.right_arrow}
              className="transition-all duration-700"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowerCard;
