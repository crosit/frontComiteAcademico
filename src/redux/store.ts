import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/index";
import headerNavReducer from "./headerNav/index";
import notificationsReducer from "./notifications/index";
import app from "./app/index";

export const store = configureStore({
  reducer: {
    app: app,
    counter: counterReducer,
    headerNav: headerNavReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
