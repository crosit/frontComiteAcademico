import React from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { getUserNotifications } from "../redux/notifications";
import { AppDispatch } from "../redux/store";
import {
  getNotifications,
  markAllReadNotification,
  markReadNotification,
} from "../services/notifications.service";

const useNotifications = (apiURL: string, params: any) => {
  const dispatch = useDispatch<AppDispatch>();

  const notifications = useQuery(
    "notifications",
    () => getNotifications(apiURL, params),
    {
      onSuccess: (res) => {
        dispatch(getUserNotifications(res.data.reverse()));
      },
    }
  );

  const markRead = useMutation((id: number) => markReadNotification(id), {
    onSuccess: () => {
      notifications.refetch();
    },
  });

  const markAllRead = useMutation(() => markAllReadNotification(), {
    onSuccess: () => {
      notifications.refetch();
    },
  });

  const onMarkRead = (id: number) => {
    markRead.mutate(id);
  };

  const onMarkAllRead = () => {
    markAllRead.mutate();
  };

  return {
    getNotifications: notifications,
    onMarkRead,
    onMarkAllRead,
  };
};

export default useNotifications;
