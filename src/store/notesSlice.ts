import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormState } from "./formSlice";

export interface Note {
  name: string;
  created: Date;
  category: string;
  content: string;
  dates: string[];
  archived: boolean;
}

export interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [
    {
      name: "Shopping List",
      created: new Date(2023, 7, 25),
      category: "Task",
      content: "Tomatoes, bread",
      dates: [],
      archived: true,
    },
    {
      name: "Grocery List",
      created: new Date(2023, 6, 25),
      category: "Task",
      content: "Milk, eggs, butter, 07/26/2023, 07/27/2023",
      dates: ["26/07/2023", "27/07/2023"],
      archived: false,
    },
    {
      name: "Meeting Schedule",
      created: new Date(2023, 6, 25),
      category: "Idea",
      content: "Team meeting, 08/02/2023, 08/16/2023, 08/30/2023",
      dates: ["02/08/2023", "16/08/2023", "30/08/2023"],
      archived: false,
    },
    {
      name: "Birthday Party Planning",
      created: new Date(2023, 6, 25),
      category: "Idea",
      content: "Buy decorations, cake, 09/10/2023",
      dates: ["10/09/2023"],
      archived: false,
    },
    {
      name: "Project Milestones",
      created: new Date(2023, 6, 25),
      category: "Idea",
      content: "Project kickoff, 11/01/2023, 11/15/2023, 11/30/2023",
      dates: ["01/11/2023", "15/11/2023", "30/11/2023"],
      archived: false,
    },
    {
      name: "Vacation Planning",
      created: new Date(2023, 6, 25),
      category: "Random Thought",
      content: "Book flights, 12/05/2023, 12/15/2023",
      dates: ["05/12/2023", "15/12/2023"],
      archived: false,
    },
    {
      name: "Study Schedule",
      created: new Date(2023, 6, 25),
      category: "Random Thought",
      content: "Study for exams, 01/20/2023, 01/25/2023",
      dates: ["20/01/2023", "25/01/2023"],
      archived: false,
    },
  ],
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (
      state,
      action: PayloadAction<{
        name: string;
        category: string;
        content: string;
      }>
    ) => {
      const { name, category, content } = action.payload;
      const newNote: Note = {
        name: name,
        created: new Date(),
        category: category,
        content: content,
        dates: extractDates(content),
        archived: false,
      };
      state.notes.push(newNote);
    },
    updateNote: (
      state,
      action: PayloadAction<{ formData: FormState; noteIndex: number }>
    ) => {
      const { formData, noteIndex } = action.payload;
      state.notes[noteIndex] = {
        ...state.notes[noteIndex],
        name: formData.name,
        category: formData.category,
        content: formData.content,
        dates: extractDates(formData.content),
      };
    },
    toggleArchivedStatus: (
      state,
      action: PayloadAction<{ noteIndex: number }>
    ) => {
      state.notes[action.payload.noteIndex].archived =
        !state.notes[action.payload.noteIndex].archived;
    },
    removeNote: (state, action: PayloadAction<{ noteIndex: number }>) => {
      const { noteIndex } = action.payload;
      state.notes = state.notes
        .slice(0, noteIndex)
        .concat(state.notes.slice(noteIndex + 1));
    },
  },
});

const extractDates = (inputString: string): string[] => {
  const datePattern = /\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/g;
  const datesArray: string[] = [];

  let match: RegExpExecArray | null;
  while ((match = datePattern.exec(inputString))) {
    const day = match[1];
    const month = match[2];
    const year = match[3];
    const date = `${day}/${month}/${year}`;
    datesArray.push(date);
  }

  return datesArray;
};

export default notesSlice.reducer;
export const { addNote, updateNote, toggleArchivedStatus, removeNote } =
  notesSlice.actions;
