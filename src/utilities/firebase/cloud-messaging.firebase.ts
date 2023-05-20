import { FirebaseApp, initializeApp } from "firebase/app";
import axios from "axios";
import {
  getMessaging,
  getToken,
  Messaging,
  onMessage,
} from "firebase/messaging";

export class PushNotificationHandler {
  private app?: FirebaseApp;
  private messaging?: Messaging;
  private API_URL: string = import.meta.env.VITE_API_URL!;

  bootstrapApp = async () => {
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    };
    this.app = initializeApp(firebaseConfig);
    this.messaging = getMessaging();
  };

  public subscribe(cb: Function) {
    if (!this.app || !this.messaging) {
      throw new Error("Notifications are disabled!");
    }

    return onMessage(this.messaging, (payload) => {
      console.log("RECIBI", payload);
    });
  }

  notificationsGranted = (): Promise<boolean> => {
    return Notification.requestPermission().then(
      (status) => status === "granted"
    );
  };

  public init(): Promise<void> {
    return this.notificationsGranted().then((granted) => {
      if (!granted) throw new Error("Notifications are disabled!");
      this.bootstrapApp();
      this.getTokenDb();
    });
  }

  private getTokenDb = async (): Promise<void> => {
    try {
      if (!this.app || !this.messaging) {
        throw new Error("Notifications are disabled!");
      }
      // const tokenStored = await get("fcmToken");
      const tokenStored = "";

      // console.log('FMC_stored',tokenStored)
      if (tokenStored) return;
      const fcmToken = await getToken(this.messaging, {
        vapidKey: import.meta.env.VITE_VAPID_KEY,
      });

      const body = { token: fcmToken } as unknown as BodyInit;
      await this.storeFCMToken(fcmToken);
      this.setFCMTokenLS(fcmToken);
    } catch (error) {
      console.log(error, "GettingToken u.u");
    }
  };

  private getJwtFromLS = (): string | null => {
    return localStorage.getItem("sabeeoToken");
  };

  private setFCMTokenLS = (fcmToken: string): void => {
    localStorage.setItem("notificationsfcm", fcmToken);
    console.log("notificationsfcm", fcmToken);
  };

  private storeFCMToken = async (fcmToken: string) => {
    const jwtToken: string | null = this.getJwtFromLS();
    return await axios.post(
      `${this.API_URL}notifications/fcmtokens`,
      { token: fcmToken },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
  };

  private getFCMToken = async (fcmToken: string) => {
    const jwtToken: string | null = this.getJwtFromLS();
    return await axios.get(`${this.API_URL}notifications/fcmtoken`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });
  };
}
