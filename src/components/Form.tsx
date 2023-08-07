import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelEditing } from "../store/appSlice";
import { FormState, updateField } from "../store/formSlice";
import { addNote, updateNote } from "../store/notesSlice";
import { AppDispatch, RootState } from "../store/store";

interface FormProps {
  initialData?: FormState;
  noteIndex?: number;
}

const classNames = {
  input: " bg-transparent outline-none ",
};

const Form: React.FC<FormProps> = ({ initialData, noteIndex }) => {
  const formData = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch<AppDispatch>();

  // populating the form with data once it is rendered

  useEffect(() => {
    if (initialData) {
      dispatch(updateField({ field: "name", value: initialData.name }));
      dispatch(updateField({ field: "category", value: initialData.category }));
      dispatch(updateField({ field: "content", value: initialData.content }));
    }
  }, []);

  // defining handler functions

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    initialData
      ? () => {
          if (noteIndex)
            try {
              dispatch(updateNote({ formData, noteIndex }));
            } catch (error) {
              console.log(error);
            }
        }
      : dispatch(addNote(formData));
    dispatch(cancelEditing());
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name: field, value } = e.target;
    dispatch(updateField({ field, value }));
  };

  const handleCancel = () => dispatch(cancelEditing());

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-100 rounded-lg grid grid-cols-[33%13%39%14%] gap-[2%] h-14 items-center justify-between px-8"
    >
      <input
        className={`font-bold text-neutral-600` + classNames.input}
        type="text"
        name="name"
        id="name"
        placeholder="Name"
        required
        value={formData.name}
        onChange={handleChange}
      />
      <select
        className={classNames.input}
        name="category"
        id="category"
        value={formData.category}
        onChange={handleChange}
      >
        <option value="Task">Task</option>
        <option value="Random Thought">Random Thought</option>
        <option value="Idea">Idea</option>
      </select>
      <input
        className={classNames.input}
        type="text"
        name="content"
        id="content"
        placeholder="Content"
        required
        value={formData.content}
        onChange={handleChange}
      />
      <span className="flex items-center">
        <button
          type="submit"
          className="w-6 h-6 bg-transparent opacity-50 hover:opacity-75"
        >
          <img src="./icons/submit.svg" alt="submit" />
        </button>
        <button
          type="button"
          className="w-6 h-6 bg-transparent opacity-50 hover:opacity-75"
          onClick={handleCancel}
        >
          <img src="./icons/cancel.svg" alt="cancel" />
        </button>
      </span>
    </form>
  );
};

export default Form;
