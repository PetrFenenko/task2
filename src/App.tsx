import React from "react";

import "./App.css";

import { useDispatch, useSelector } from "react-redux";
import AddNoteForm from "./components/AddNoteForm";
import Container from "./components/Container";
import Form from "./components/Form";
import HeaderButton from "./components/HeaderButton";
import NoteRow from "./components/NoteRow";
import SummaryRow from "./components/SummaryRow";
import Table from "./components/Table";
import { toggleArchivedDisplay } from "./store/appSlice";
import { AppDispatch, RootState } from "./store/store";
import { Summary, getSummaryData } from "./utils/utils";

const App: React.FC = () => {
  const {
    app: appState,
    notes: { notes },
  } = useSelector((state: RootState) => state);

  const dispatch = useDispatch<AppDispatch>();

  const handleToggleArchivedDisplay = () => dispatch(toggleArchivedDisplay());

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
            <HeaderButton
              displayArchived={appState.displayArchived}
              onClick={handleToggleArchivedDisplay}
            />,
          ]}
        >
          {notes.map(
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
        </Table>
        <AddNoteForm />

        <Table
          headers={["Note Category", "Active", "Archived"]}
          className="summary"
        >
          {getSummaryData(notes).map((summaryData: Summary, key) => (
            <SummaryRow key={key} summary={summaryData} />
          ))}
        </Table>
      </Container>
    </>
  );
};

export default App;
