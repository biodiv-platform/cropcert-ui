export const ccListColumns = [
  {
    name: "#",
    selector: (row) => row["code"],
    sortable: true,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row["name"],
  },
  {
    name: "Village",
    selector: (row) => row["village"],
  },
  {
    name: "Type",
    selector: (row) => row["type"],
  },
  {
    name: "CO Code",
    selector: (row) => row["coCode"],
  },
];
