import React from "react";

export default function LotShowPageComponent({ lot }) {
  return (
    <div>
      <pre>{JSON.stringify(lot, null, 2)}</pre>
    </div>
  );
}
