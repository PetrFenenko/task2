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
    <form onSubmit={handleSubmit}>
      <input
        className="entry__name"
        type="text"
        name="name"
        id="name"
        placeholder="Name"
        required
        value={formData.name}
        onChange={handleChange}
      />
      <select
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
        type="text"
        name="content"
        id="content"
        placeholder="Content"
        required
        value={formData.content}
        onChange={handleChange}
      />
      <span className="entry__buttons">
        <button type="submit">
          <SubmitSVG />
        </button>
        <button type="button" onClick={handleCancel}>
          <CancelSVG />
        </button>
      </span>
    </form>
  );
};

export default Form;

const CancelSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
    <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
  </svg>
);
const SubmitSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
    <path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z" />
  </svg>
);
