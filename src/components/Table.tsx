interface TableProps {
  headers: Array<string | React.ReactNode>;
  children: React.ReactNode[];
  className: string;
}

const Table: React.FC<TableProps> = ({ headers, children, className }) => {
  return (
    <div className="table">
      <div className={`table-header ${className}`}>
        {headers.map((header) => (
          <div className="header-item">{header}</div>
        ))}
      </div>
      {[...children]}
    </div>
  );
};

export default Table;
