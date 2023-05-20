import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import axiosClient from "../../interceptors/axiosInterceptor";
import { CloseCircleOutlined } from "@ant-design/icons";

export interface NotificationsIndex {
  id: number;
  receiverId: number;
  subject: string;
  content: string;
  redirectUrl: string;
  read: boolean;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
}

export const NotificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    colleccion: [],
    noRead: 0,
    isLoading: false,
  },
  reducers: {
    getUserNotifications: (state, action) => {
      state.colleccion = action.payload;
    },
    getNoReadNotifications: (state, action) => {
      state.noRead = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    resetUserNotifications: () => {
      return {
        colleccion: [],
        noRead: 0,
        isLoading: false,
      };
    },
  },
});

export const getUserNotificationsAsync = async (dispatch: any) => {
  dispatch(setIsLoading(true));
  axiosClient.get("notifications/get").then((res: any) => {
    if (res.success) {
      dispatch(getUserNotifications(res.data));
      dispatch(setIsLoading(false));
    } else {
      notification.error({
        message: "Error",
        description: "Something went wrong, please try again later",
        
        style: {
          background: "#ffe7a6",
          borderRadius: "10px",
          fontWeight: "bold",
        },
        icon: <CloseCircleOutlined style={{ color: "#FF4D4F" }} />,

      });
    }
  });
};

export const getNoReadNotificationsAsync = async (dispatch: any) => {
  dispatch(setIsLoading(true));
  axiosClient.get("notifications/get", {params: {'read': 0}})
  .then((res: any) => {
    if (res.success) {
      dispatch(getNoReadNotifications(res.data.data.length));
      dispatch(setIsLoading(false));
    } else {
      notification.error({
        message: "Error",
        description: "Something went wrong, please try again later",
      });
    }
  });
};

// export const markAsRead = async (dispatch: any, notifications: any) => {
//   axiosClient
//     .patch(`broadcast-messages/${notifications.id}`, { read: true })
//     .then((res: any) => {
//       if (res.success) {
//         dispatch(getUserNotificationsAsync);
//       }
//     });
// };

// export const markAsReadAll = async (dispatch: any) => {
//   axiosClient.patch("broadcast-messages/read-all").then((res: any) => {
//     if (res.statusCode === 200 || res.statusCode === 201) {
//       dispatch(getUserNotificationsAsync);
//     }
//   });
// };

export const {
  resetUserNotifications,
  getUserNotifications,
  getNoReadNotifications,
  setIsLoading,
} = NotificationsSlice.actions;
export default NotificationsSlice.reducer;
