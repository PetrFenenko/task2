import React from "react";

import "./App.css";

import { useSelector } from "react-redux";
import AddNoteForm from "./components/AddNoteForm";
import Container from "./components/Container";
import Form from "./components/Form";
import NoteRow from "./components/NoteRow";
import SummaryRow from "./components/SummaryRow";
import Table from "./components/Table";
import { toggleArchivedDisplay } from "./store/appSlice";
import { Note } from "./store/notesSlice";
import { RootState } from "./store/store";

import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";

export interface Summary {
  category: "Task" | "Random Thought" | "Idea";
  active: number;
  archived: number;
}

const App: React.FC = () => {
  const appState = useSelector((state: RootState) => state.app);
  const {
    notes: { notes },
  } = useSelector((state: RootState) => state);

  const dispatch = useDispatch<AppDispatch>();

  const handleToggleArchivedDisplay = () => dispatch(toggleArchivedDisplay());

  const HeaderButton = () => (
    <button
      className="header__button"
      onClick={handleToggleArchivedDisplay}
      title={`Display ${appState.displayArchived ? "active" : "archived"}`}
    >
      {appState.displayArchived ? <DisplayActiveSVG /> : <DisplayArchivedSVG />}
    </button>
  );

  getSummaryData(notes);
  return (
    <>
      <Container>
        <Table
          className="notes"
          headers={[
            "Name",
            "Created on",
            "Category",
            "Content",
            "Dates",
            HeaderButton(),
          ]}
          entries={notes.map(
            (entry, noteIndex) =>
              // filtering notes with the correct 'archived' status
              entry.archived === appState.displayArchived &&
              // rendering form in case note is being edited
              (noteIndex === appState.editedNoteIndex ? (
                <Form
                  initialData={{
                    name: entry.name,
                    category: entry.category,
                    content: entry.content,
                  }}
                  noteIndex={noteIndex}
                />
              ) : (
                <NoteRow noteData={entry} noteIndex={noteIndex} />
              ))
          )}
        />
        <AddNoteForm />

        <Table
          headers={["Note Category", "Active", "Archived"]}
          entries={getSummaryData(notes).map((summaryData: Summary, key) => (
            <SummaryRow key={key} summary={summaryData} />
          ))}
          className="summary"
        />
      </Container>
    </>
  );
};

export default App;

const DisplayArchivedSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
    <path d="M180-120q-24 0-42-18t-18-42v-523q0-15 3-25.5t11-19.5l56-76q8-9 18.5-12.5t24.886-3.5h493.228Q741-840 751-836.5t18 12.5l57 76q8 9 11 19.5t3 25.5v523q0 24-18 42t-42 18H180Zm17-614h565l-36.409-46H233l-36 46Zm-17 60v494h600v-494H180Zm300 404 156-156-40-40-86 86v-201h-60v201l-86-86-40 40 156 156Zm-300 90h600-600Z" />
  </svg>
);

const DisplayActiveSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
    <path d="M180-120q-24 0-42-18t-18-42v-523q0-15 3-25.5t11-19.5l56-76q8-9 18.5-12.5t24.886-3.5h493.228Q741-840 751-836.5t18 12.5l57 76q8 9 11 19.5t3 25.5v523q0 24-18 42t-42 18H180Zm17-614h565l-36.409-46H233l-36 46Zm-17 60v494h600v-494H180Zm270 404h60v-201l86 86 40-40-156-156-156 156 40 40 86-86v201Zm-270 90h600-600Z" />
  </svg>
);

const getSummaryData = (notes: Note[]): Summary[] => {
  const summaryTemplate: Summary[] = [
    {
      category: "Task",
      active: 0,
      archived: 0,
    },
    {
      category: "Random Thought",
      active: 0,
      archived: 0,
    },
    {
      category: "Idea",
      active: 0,
      archived: 0,
    },
  ];

  const summaryData = notes.reduce((accumulator, currentItem) => {
    const index = accumulator.findIndex(
      (element: Summary) => element.category === currentItem.category
    );

    currentItem.archived
      ? accumulator[index].archived++
      : accumulator[index].active++;

    return accumulator;
  }, summaryTemplate);
  return summaryData;
};
