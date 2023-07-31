import { Summary } from "../App";
const SummaryRow: React.FC<Summary> = ({ category, active, archived }) => {
  return (
    <div className="entry summary">
      <div className="entry__name">{category}</div>
      <div>{active}</div>
      <div>{archived}</div>
    </div>
  );
};

export default SummaryRow;
