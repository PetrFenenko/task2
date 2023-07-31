import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  adding: boolean;
  editedNoteIndex: number | false;
  displayArchived: boolean;
}

const initialState: AppState = {
  adding: false,
  editedNoteIndex: false,
  displayArchived: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleArchivedDisplay: (state) => {
      state.displayArchived = !state.displayArchived;
    },
    toggleAdding: (state) => {
      state.editedNoteIndex = false;
      state.adding = !state.adding;
    },
    setEditing: (state, action: PayloadAction<{ noteIndex: number }>) => {
      state.adding = false;
      state.editedNoteIndex = action.payload.noteIndex;
    },
    cancelEditing: (state) => {
      state.adding = false;
      state.editedNoteIndex = false;
    },
  },
});

export default appSlice.reducer;
export const {
  toggleAdding,
  setEditing,
  cancelEditing,
  toggleArchivedDisplay,
} = appSlice.actions;
