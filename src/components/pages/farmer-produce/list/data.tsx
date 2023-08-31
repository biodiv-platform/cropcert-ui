export const batchColumns = [
  {
    name: "#",
    selector: (row) => row["farmerProduceId"],
    maxWidth: "100px",
    sortable: true,
    cell: (row) => `FP-${row.farmerProduceId}`,
  },
  {
    name: "Farmer Name",
    selector: (row) => row["farmerName"],
    maxWidth: "280px",
  },
  {
    name: "Collection Date",
    selector: (row) => row["collectionDate"],
    maxWidth: "150px",
    sortable: true,
  },
  {
    name: "Quantity",
    selector: (row) => row["quantity"],
    maxWidth: "100px",
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
    name: "Farmer ID",
    selector: (row) => row["farmerId"],
    maxWidth: "120px",
    sortable: true,
    cell: (row) => `${row.farmerId}`,
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
