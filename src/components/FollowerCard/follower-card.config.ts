import { FollowType } from "../../redux/types/user.types";

export type PropsType = {
  follower: FollowType;
  selectedUser: FollowType | undefined;
  setSelectedUser: (user: FollowType) => void;
  roomId: string | null;
  setSelectedRoomId: (id: string | null) => void;
};
