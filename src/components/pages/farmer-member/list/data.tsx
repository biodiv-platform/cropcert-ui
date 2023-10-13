export const batchColumns = [
  {
    name: "#",
    selector: (row) => row["farmerId"],
    maxWidth: "100px",
    sortable: true,
    cell: (row) => `${row.farmerId}`,
  },
  {
    name: "Name",
    selector: (row) => row["personalDetails"]["farmer_name"],
    width: "280px",
  },
  {
    name: "Village",
    selector: (row) => row["personalDetails"]["village"],
    maxWidth: "260px",
    sortable: true,
  },
  {
    name: "Collection Center",
    selector: (row) => row["personalDetails"]["cc"],
    maxWidth: "250px",
    sortable: true,
  },
  {
    name: "No. of Coffee Trees",
    selector: (row) => row["farmDetails"]["no_of_coffee_trees"],
    maxWidth: "210px",
    sortable: true,
    right: true,
  },
  {
    name: "Land Acreage",
    selector: (row) => row["farmDetails"]["land_acreage"],
    maxWidth: "210px",
    sortable: true,
    right: true,
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
