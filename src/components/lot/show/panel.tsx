import { ChevronDown24, ChevronRight24 } from "@carbon/icons-react";
import useToggle from "@rooks/use-toggle";
import React from "react";

export default function LotShowPanel({
  title,
  children,
  isOpen = false,
  count = -1,
  icon,
}) {
  const [show, toggleShow] = useToggle(isOpen);

  return (
    <>
      <h2 className="eco--panel" onClick={toggleShow}>
        {show ? <ChevronDown24 /> : <ChevronRight24 />} {`${icon} `}
        {count > -1 && (count > 0 ? count : "No")} {title}
      </h2>
      {show && children}
    </>
  );
}
