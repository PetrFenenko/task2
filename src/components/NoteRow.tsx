import { Note } from "../store/notesSlice";

import { useDispatch } from "react-redux";
import { setEditing } from "../store/appSlice";
import { removeNote, toggleArchivedStatus } from "../store/notesSlice";

interface NoteRowProps {
  noteData: Note;
  noteIndex: number;
}

const classNames = {
  text: " overflow-hidden whitespace-nowrap text-ellipsis",
  button: " w-6 h-6 bg-transparent opacity-50 hover:opacity-75",
};

const NoteRow: React.FC<NoteRowProps> = ({ noteData, noteIndex }) => {
  const dispatch = useDispatch();

  const handleSetEditing = () => dispatch(setEditing({ noteIndex }));

  const handleToggleArchiveStatus = () =>
    dispatch(toggleArchivedStatus({ noteIndex }));

  const handleRemoveNote = () => dispatch(removeNote({ noteIndex }));

  return (
    <div
      className="bg-neutral-100 rounded-lg grid gap-x-1 h-14 items-center justify-between px-8 grid-cols-notes"
      key={noteIndex}
    >
      <div className={`font-bold text-neutral-700` + classNames.text}>
        {noteData.name}
      </div>
      <div className={classNames.text}>
        {noteData.created.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </div>
      <div className={classNames.text}>{noteData.category}</div>
      <div className={classNames.text}>{noteData.content}</div>
      <div className={classNames.text}>{noteData.dates.join(", ")}</div>

      <span className="flex items-center ">
        <button className={classNames.button} onClick={handleSetEditing}>
          <img src="./icons/edit.svg" alt="edit" />
        </button>
        <button
          className={classNames.button}
          onClick={handleToggleArchiveStatus}
        >
          {noteData.archived ? (
            <img src="./icons/unarchive.svg" alt="unarchive" />
          ) : (
            <img src="./icons/archive.svg" alt="archive" />
          )}
        </button>
        <button className={classNames.button} onClick={handleRemoveNote}>
          <img src="./icons/delete.svg" alt="delete" />
        </button>
      </span>
    </div>
  );
};

export default NoteRow;
