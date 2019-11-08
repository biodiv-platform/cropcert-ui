import React from "react";
import Skeleton from "tiny-skeleton-loader-react";

function Loading() {
  return (
    <div>
      <Skeleton height="48px" radius="0" />
      <div className="bx--grid eco--grid pt-2">
        <div className="bx--row">
          <h1>Loading...</h1>
        </div>
      </div>
    </div>
  );
}

export default Loading;
