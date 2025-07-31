import useGlobalState from "@hooks/use-global-state";
import React, { useState } from "react";

import { Tooltip } from "@/components/ui/tooltip";

export default function CoopCell({ coCode }: { coCode: number[] }) {
  const { multiSelectCo } = useGlobalState();
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 30;

  let coopStr = "";

  const coCodeSet = new Set(coCode);

  if (multiSelectCo) {
    // Filter and sort matching cooperatives alphabetically
    const matchingCoops = multiSelectCo
      .filter((c) => coCodeSet.has(c.value))
      .sort((a, b) => a.label.localeCompare(b.label));

    matchingCoops.forEach((co) => {
      coopStr += `${co.label}, `;
    });
    coopStr = coopStr.slice(0, -2);
  }

  if (!coopStr) return null;

  const shouldTruncate = coopStr.length > maxLength;
  const displayText = shouldTruncate && !isExpanded ? `${coopStr.slice(0, maxLength)}...` : coopStr;

  return (
    <Tooltip openDelay={100} showArrow content={isExpanded ? "Show less" : "Show more"}>
      <div
        onClick={() => shouldTruncate && setIsExpanded(!isExpanded)}
        style={{
          cursor: shouldTruncate ? "pointer" : "default",
          transition: "all 0.3s ease",
        }}
      >
        {displayText}
      </div>
    </Tooltip>
  );
}
