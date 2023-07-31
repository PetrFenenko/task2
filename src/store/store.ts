import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import formReducer from "./formSlice";
import notesReducer from "./notesSlice";

const store = configureStore({
  reducer: {
    notes: notesReducer,
    form: formReducer,
    app: appReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
