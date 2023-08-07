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
    <div className="mt-2 flex flex-col gap-[2%]">
      {appState.adding && <Form />}
      <div className="flex w-full justify-end h-24 items-center">
        <button
          className="px-6 py-6 rounded-lg bg-neutral-400 font-bold text-white hover:text-neutral-100"
          onClick={handleAddButtonClick}
        >
          ADD A NOTE
        </button>
      </div>
    </div>
  );
};

export default AddNoteForm;
