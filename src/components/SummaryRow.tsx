import { Summary } from "../utils/utils";
interface SummaryRowProps {
  key: number;
  summary: Summary;
}

const SummaryRow: React.FC<SummaryRowProps> = ({ key, summary }) => {
  return (
    <div
      className="bg-neutral-100 rounded-md grid gap-[2%] h-14 items-center justify-between pl-8 pr-4 grid-cols-summary"
      key={key}
    >
      <div className="font-bold text-neutral-700">{summary.category}</div>
      <div>{summary.active}</div>
      <div>{summary.archived}</div>
    </div>
  );
};

export default SummaryRow;
