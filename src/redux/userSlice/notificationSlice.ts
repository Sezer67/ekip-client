import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationStateType } from "../types/notification.type";

const initialState: NotificationStateType = {
  description: "",
  isNotification: false,
  message: "",
  placement: "top",
  status: "success",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: { ...initialState },
  reducers: {
    setNotification: (state, action: PayloadAction<NotificationStateType>) => {
      state.isNotification = action.payload.isNotification;
      state.description = action.payload.description;
      state.message = action.payload.message;
      state.placement = action.payload.placement;
      state.status = action.payload.status;
    },
  },
});

export default notificationSlice.reducer;
export const { setNotification } = notificationSlice.actions;
