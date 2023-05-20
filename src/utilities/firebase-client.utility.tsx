import { FirebaseApp, initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  Messaging,
  onMessage,
} from "firebase/messaging";
import { fetchRequest } from "./fetch.utility";
import { get, save } from "./storage.utility";
import { createLocalStorageDispatch } from "react-localstorage-hooks";
import { notification } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
//import { notification } from "antd";

function reducer(state: any, action: any) {
  switch (action.type) {
    case "NOTIFICATION":
      return { notifications: true };
    default:
      return state;
  }
}

export class PushNotificationHandler {
  private app?: FirebaseApp;
  private messaging?: Messaging;

  public subscribe(cb: Function) {
    if (!this.app || !this.messaging) {
      throw new Error("Notifications are disabled!");
    }

    return onMessage(this.messaging, (payload) => {
      console.log("RECIBI", payload);
      const dispatch = createLocalStorageDispatch("notifications", reducer);
      dispatch({ type: "NOTIFICATION" });
      notification.success({
        message: payload?.notification?.title,
        description: payload?.notification?.body,
        style: {
          background: "#ffe7a6",
          borderRadius: "10px",
          fontWeight: "bold",
          // border: "2px solid #52C41A",
        },
        icon: <CheckCircleOutlined style={{ color: "#52C41A" }} />,
      });
    });
  }

  public init(): Promise<void> {
    return this.notificationsGranted().then(async (granted) => {
      if (!granted) throw new Error("Notifications are disabled!");
      this.bootstrapApp();
      this.getToken();
    });
  }

  public async getToken(): Promise<void> {
    try {
      if (!this.app || !this.messaging) {
        throw new Error("Notifications are disabled!");
      }

      const tokenStored = await get("fcmToken");

      if (tokenStored) return;
      const fcmToken = await getToken(this.messaging, {
        vapidKey: import.meta.env.VITE_VAPID_KEY,
      });

      const body = { token: fcmToken } as unknown as BodyInit;

      fetchRequest("notifications/fcmtokens", {
        method: "POST",
        body,
      }).then(() => {
        save("fcmToken", fcmToken);
      });
    } catch (error) {
      console.log(error, "GettingToken u.u");
    }
  }

  private async bootstrapApp() {
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    };
    this.app = initializeApp(firebaseConfig);
    this.messaging = getMessaging();
  }

  public notificationsGranted(): Promise<boolean> {
    return Notification.requestPermission().then(
      (status) => status === "granted"
    );
  }
}
