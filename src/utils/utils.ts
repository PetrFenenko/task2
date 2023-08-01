import { Note } from "../store/notesSlice";
export interface Summary {
  category: "Task" | "Random Thought" | "Idea";
  active: number;
  archived: number;
}

export const getSummaryData = (notes: Note[]): Summary[] => {
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
