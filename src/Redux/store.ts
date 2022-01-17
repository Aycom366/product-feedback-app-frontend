import { configureStore } from "@reduxjs/toolkit";
import currentWidthReducer from "./slices/Width";
import settingsReducer from "./slices/settings";
import userReducer from "./slices/userSlice";
import feedbackReducer from "./slices/feedbackSlice";

export const store = configureStore({
  reducer: {
    currentWidth: currentWidthReducer,
    generalSettings: settingsReducer,
    user: userReducer,
    feedback: feedbackReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
