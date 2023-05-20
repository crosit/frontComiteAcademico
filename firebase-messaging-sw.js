importScripts("https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.1.1/firebase-messaging.js");
importScripts(
  "https://cdn.jsdelivr.net/npm/localforage@1.10.0/dist/localforage.min.js"
);

let messaging = null;

const firebaseConfig = {
  apiKey: "AIzaSyD3LfBZtiykRx9DR6SUDiF2JVqAGw3P2dc",
  authDomain: "sabeeo.firebaseapp.com",
  projectId: "sabeeo",
  storageBucket: "sabeeo.appspot.com",
  messagingSenderId: "208781053446",
  appId: "1:208781053446:web:c839a731756cdc8498bd87",
  measurementId: "G-C58L07HYW6",
};
const API_URL = "https://test-apiv2.menita.cloud/api";
const VAPID_KEY =
  "BN9v2ob0I6C-j92Qy67WFMdIg0-1PJVAmEvAanFrDj0L-pSa-CsIW-i8ZRkXtzCzej5oIhrblcXr6wZ0787FAMM";

const init = () => {
  firebase.initializeApp(firebaseConfig);
  messaging = firebase.messaging();
};

const subscribeToMessages = () => {
  messaging.onBackgroundMessage((payload) => {
    console.log("Received background message ", payload);
    const notificationOptions = {
      body: payload.data.text,
      data: payload.data,
      requireInteraction: true,
    };

    return self.registration.showNotification(
      payload.data.subject,
      notificationOptions
    );
  });
};

const onNotificationTap = () => {
  self.addEventListener("notificationclick", (event) => {
    try {
      const id = event.notification.data.id;
      markAsRead(id);
      event.notification.close();
      clients.openWindow(event.notification.data.redirectUrl);
    } catch (err) {
      console.log("CANT MARK AS READ", err);
    }
  });
};

init();

//pushToken()
subscribeToMessages();
onNotificationTap();
