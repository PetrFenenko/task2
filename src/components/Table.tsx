interface TableProps {
  headers: Array<string | React.ReactNode>;
  entries: React.ReactNode[];
  className: string;
}

const Table: React.FC<TableProps> = ({ headers, entries, className }) => {
  return (
    <div className="table">
      <div className={`table-header ${className}`}>
        {headers.map((header) => (
          <div className="header-item">{header}</div>
        ))}
      </div>
      {[...entries]}
    </div>
  );
};

export default Table;
