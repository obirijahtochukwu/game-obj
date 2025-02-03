import React, { useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Button, Checkbox, Typography } from "@mui/material";

const data = [
  { id: 1, firstName: "John", lastName: "Doe", age: 30, city: "New York" },
  { id: 2, firstName: "Jane", lastName: "Smith", age: 25, city: "Los Angeles" },
  { id: 3, firstName: "Mike", lastName: "Johnson", age: 40, city: "Chicago" },
];

const ExampleTable = () => {
  const [rowSelection, setRowSelection] = useState({});

  const handleCheckboxChange = (id) => {
    setRowSelection((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const columns = [
    {
      accessorKey: "select",
      header: "Select",
      size: 50,
      enableSorting: false,
      enableColumnActions: false,
      Cell: ({ row }) => (
        <input
          type="checkbox"
          className="h-6 w-6 ring-1 ring-pink"
          checked={rowSelection[row.original.id] || false}
          onChange={() => handleCheckboxChange(row.original.id)}
        />
      ),
    },
    { accessorKey: "firstName", header: "First Name" },
    { accessorKey: "lastName", header: "Last Name" },
    { accessorKey: "age", header: "Age" },
    { accessorKey: "city", header: "City" },
  ];

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableRowSelection={false}
      state={{ rowSelection }}
      renderTopToolbarCustomActions={() => (
        <Button onClick={() => console.log("Selected Rows:", rowSelection)}>Download Selected Users</Button>
      )}
      renderDetailPanel={({ row }) => (
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", width: "100%" }}>
          <Typography>First Name: {row.original.firstName}</Typography>
          <Typography>Last Name: {row.original.lastName}</Typography>
          <Typography>Age: {row.original.age}</Typography>
          <Typography>City: {row.original.city}</Typography>
        </Box>
      )}
    />
  );
};
export default ExampleTable;
