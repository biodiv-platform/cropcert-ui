import React from "react";
import DataTable from "react-data-table-component";

const Table = ({ data, ...props }) =>
  data.length ? <DataTable data={data} {...props} /> : <></>;

export default Table;
