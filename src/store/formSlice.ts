import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cancelEditing, toggleAdding } from "./appSlice";

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
    restoreInitialState: () => initialState,
  },
  // restoring initial state after ediging is done
  extraReducers: (builder) => {
    builder.addCase(cancelEditing, () => initialState);
    builder.addCase(toggleAdding, () => initialState);
  },
});

export default formSlice.reducer;
export const { updateField, restoreInitialState } = formSlice.actions;
