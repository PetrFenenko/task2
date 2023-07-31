import { Summary } from "../App";
interface SummaryRowProps {
  key: number;
  summary: Summary;
}

const SummaryRow: React.FC<SummaryRowProps> = ({ key, summary }) => {
  return (
    <div className="entry summary" key={key}>
      <div className="entry__name">{summary.category}</div>
      <div>{summary.active}</div>
      <div>{summary.archived}</div>
    </div>
  );
};

export default SummaryRow;
