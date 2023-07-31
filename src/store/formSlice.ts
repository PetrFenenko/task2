import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cancelEditing } from "./appSlice";

export interface FormState {
  name: string;
  category: string;
  content: string;
}

const initialState: FormState = {
  name: "",
  category: "Task",
  content: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ field: string; value: string }>
    ) => {
      try {
        state[action.payload.field as keyof FormState] = action.payload.value;
      } catch (error) {
        console.log(error);
      }
    },
    restoreInitialState: (state) => {
      state = initialState;
    },
  },
  // restoring initial state after ediging is done
  extraReducers: (builder) => {
    builder.addCase(cancelEditing, (state) => (state = initialState));
  },
});

export default formSlice.reducer;
export const { updateField, restoreInitialState } = formSlice.actions;
