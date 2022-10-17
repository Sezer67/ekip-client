import { NotificationPlacement } from "antd/lib/notification";

export type NotificationStateType = {
  status: Status;
  message: string;
  description: string;
  placement: NotificationPlacement;
  isNotification: boolean;
};

type Status = "error" | "info" | "success";
