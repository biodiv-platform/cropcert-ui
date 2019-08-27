import React from "react";

export default function BasicInfo({ lot }) {
  return (
    <>
      <div className="bx--row mb-4">
        <div className="bx--col-lg-3 bx--col-md-12">
          <h2>Type</h2>
          {lot.type}
        </div>
        <div className="bx--col-lg-3 bx--col-md-12">
          <h2>Quantity</h2>
          {lot.quantity}
        </div>
        <div className="bx--col-lg-3 bx--col-md-12">
          <h2>Outturn</h2>
          {lot.outTurn}
        </div>
        <div className="bx--col-lg-3 bx--col-md-12">
          <h2>Created On</h2>
          {/* {lot.createdOn} */}
        </div>
      </div>
    </>
  );
}
