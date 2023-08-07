import React from "react";

const HeaderButton: React.FC<{
  displayArchived: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ displayArchived, onClick }) => (
  <button
    className="flex items-center h-8 w-8 filter invert hover:opacity-90"
    onClick={onClick}
    title={`Display ${displayArchived ? "active" : "archived"}`}
  >
    {displayArchived ? (
      <img src="./icons/unarchive.svg" alt="archived" />
    ) : (
      <img src="./icons/archive.svg" alt="unarchived" />
    )}
  </button>
);

export default HeaderButton;
