interface TableProps {
  headers: Array<string | React.ReactNode>;
  children: React.ReactNode[];
  className: string;
}

const Table: React.FC<TableProps> = ({ headers, children, className }) => {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`bg-neutral-500 rounded-lg grid gap-x-1 h-14 items-center justify-between px-8  ${className} `}
      >
        {headers.map((header) => (
          <div className="text-white overflow-hidden whitespace-nowrap text-ellipsis text-left font-bold">
            {header}
          </div>
        ))}
      </div>
      {[...children]}
    </div>
  );
};

export default Table;
