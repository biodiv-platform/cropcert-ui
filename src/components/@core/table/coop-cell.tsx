import useGlobalState from "@hooks/use-global-state";
import React from "react";

export default function CoopCell({ coCode }: { coCode: number[] }) {
  const { multiSelectCo } = useGlobalState();

  let coopStr = "";

  const coCodeSet = new Set(coCode);

  if (multiSelectCo) {
    coCodeSet.forEach((code) => {
      const co = multiSelectCo.find((c) => c.value === code);
      if (co) {
        coopStr += `${co.label}, `;
      }
    });
    coopStr = coopStr.slice(0, -2);
  }

  return coopStr ? <div>{coopStr}</div> : null;
}
