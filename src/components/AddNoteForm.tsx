import React from "react";
import Form from "./Form";

import { useDispatch, useSelector } from "react-redux";
import { toggleAdding } from "../store/appSlice";
import { RootState } from "../store/store";

const AddNoteForm: React.FC = () => {
  const dispatch = useDispatch();
  const appState = useSelector((state: RootState) => state.app);
  const handleAddButtonClick = () => {
    appState.adding || dispatch(toggleAdding());
  };
  return (
    <div className="add-note__container ">
      {appState.adding && <Form />}
      <div className="button-container">
        <button onClick={handleAddButtonClick}>ADD A NOTE</button>
      </div>
    </div>
  );
};

export default AddNoteForm;
