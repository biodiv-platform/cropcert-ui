import React from "react";

function tooltipCell(content) {
  return (
    <span className="nobr elipsis" title={content}>
      {content || "NA"}
    </span>
  );
}

export default tooltipCell;
