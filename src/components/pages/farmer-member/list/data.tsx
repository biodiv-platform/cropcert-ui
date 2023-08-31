export const batchColumns = [
  {
    name: "#",
    selector: (row) => row["farmerId"],
    maxWidth: "100px",
    sortable: true,
    cell: (row) => `${row.farmerId}`,
  },
  {
    name: "Farmer Name",
    selector: (row) => row["farmerName"],
    width: "280px",
  },
  {
    name: "Village",
    selector: (row) => row["village"],
    maxWidth: "250px",
    sortable: true,
  },
  {
    name: "Collection Center",
    selector: (row) => row["collectionCenter"],
    maxWidth: "250px",
    sortable: true,
  },
  {
    name: "Cooperative",
    selector: (row) => row["cooperative"],
    maxWidth: "250px",
    sortable: true,
  },
  {
    name: "Region",
    selector: (row) => row["region"],
    maxWidth: "250px",
    sortable: true,
  },
];

export const lotCreateModalCols = [
  {
    name: "#",
    selector: (row) => row["farmerProduceId"],
    width: "100px",
    cell: (row) => `FP-${row.farmerProduceId}`,
  },
  {
    name: "Name",
    selector: (row) => row["farmerName"],
    width: "200px",
  },
  {
    name: "Quantity",
    selector: (row) => row["quantity"],
    sortable: true,
    right: true,
  },
];

export const lotCreateModalColsExtra = [
  {
    name: "Perchment Quantity",
    selector: (row) => row["perchmentQuantity"],
    sortable: true,
    right: true,
  },
];
