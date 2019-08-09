import React from "react";

export default function ListColumns() {
  return [
    { selector: "id", name: "User Id", sortable: true },
    { selector: "userName", name: "User Name" },
    { selector: "gender", name: "Gender", sortable: true },
    { selector: "email", name: "Email" },
    { selector: "membershipId", name: "Membership Id" },
    /*{
      name: "Actions",
      selector: "ccCode",
      sortable: true,
      cell: row => <Link to={`/farmer/show?id=${row.id}`}>View &rarr;</Link>,
    },*/
  ];
}
