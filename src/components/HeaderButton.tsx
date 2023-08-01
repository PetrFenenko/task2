import React from "react";

const HeaderButton: React.FC<{
  displayArchived: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ displayArchived, onClick }) => (
  <button
    className="header__button"
    onClick={onClick}
    title={`Display ${displayArchived ? "active" : "archived"}`}
  >
    {displayArchived ? <DisplayActiveSVG /> : <DisplayArchivedSVG />}
  </button>
);

export default HeaderButton;

const DisplayArchivedSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
    <path d="M180-120q-24 0-42-18t-18-42v-523q0-15 3-25.5t11-19.5l56-76q8-9 18.5-12.5t24.886-3.5h493.228Q741-840 751-836.5t18 12.5l57 76q8 9 11 19.5t3 25.5v523q0 24-18 42t-42 18H180Zm17-614h565l-36.409-46H233l-36 46Zm-17 60v494h600v-494H180Zm300 404 156-156-40-40-86 86v-201h-60v201l-86-86-40 40 156 156Zm-300 90h600-600Z" />
  </svg>
);

const DisplayActiveSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
    <path d="M180-120q-24 0-42-18t-18-42v-523q0-15 3-25.5t11-19.5l56-76q8-9 18.5-12.5t24.886-3.5h493.228Q741-840 751-836.5t18 12.5l57 76q8 9 11 19.5t3 25.5v523q0 24-18 42t-42 18H180Zm17-614h565l-36.409-46H233l-36 46Zm-17 60v494h600v-494H180Zm270 404h60v-201l86 86 40-40-156-156-156 156 40 40 86-86v201Zm-270 90h600-600Z" />
  </svg>
);
