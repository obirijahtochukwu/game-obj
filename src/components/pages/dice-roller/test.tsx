import React, { useEffect, useState } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Box, Button, Checkbox, Typography } from "@mui/material";
import { dataf } from "./data";

const data = Array(100).fill({ id: 1, firstName: "John", lastName: "Doe", age: 30, city: "New York" });

const ExampleTablej = () => {
  const [rowSelection, setRowSelection] = useState({});
  const [currentRows, setCurrentRows] = useState(0);
  const [tKey, setTKey] = useState(0);

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

  useEffect(() => {
    function handleResize() {
      setCurrentRows(Math.floor((window?.innerHeight - 175) / 50));

      setTKey((r) => r + 1);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <article className="h-screen bg-secondary">
      {currentRows == 0 || (
        <MaterialReactTable
          key={tKey}
          columns={columns}
          data={data}
          enableRowSelection={false}
          initialState={{
            pagination: { pageSize: currentRows, pageIndex: 0 }, // Set the number of rows per page
          }}
          muiTableBodyCellProps={{ sx: { height: "50px", padding: "0px", paddingLeft: "20px" } }}
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
      )}
    </article>
  );
};

function ExampleTable() {
  // const columns = useMemo(() => cols, [cols]);
  // const handleExportRows = (rows) => {
  //   const rowData = rows.map((row) => row.original);
  //   const csv = generateCsv(csvConfig)(rowData);
  //   download(csvConfig)(csv);
  // };
  const [tKey, setTKey] = useState(0);
  const [currentRows, setCurrentRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const rowHeight = 50;

  useEffect(() => {
    const extarnalHeight = 0;

    function handleResize() {
      const viewHeight = window?.innerHeight;
      setCurrentRows(Math.floor((window?.innerHeight - extarnalHeight) / rowHeight));
      console.log(currentRows);
      setTKey((prev) => prev + 1);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const columns = dataf.configuration.map(({ field_name, field_value }) => ({ accessorKey: field_name, header: field_value }));

  const table = useMaterialReactTable({
    // @ts-ignore
    columns,
    data: dataf.report,
    state: {
      pagination: { pageSize: currentRows, pageIndex: currentPage },
    },
    // enableRowSelection: true,
    enableStickyHeader: true,
    enableStickyFooter: true,
    // columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    // positionToolbarAlertBanner: "bottom",
    // manualPagination: false,
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        // This is how Material React Table updates the state
        const updatedState = updater({
          pageIndex: table.getState().pagination.pageIndex,
          pageSize: table.getState().pagination.pageSize,
        });

        setCurrentPage(updatedState.pageIndex); // Update currentPage
        console.log("Pagination changed:", updatedState);
      } else {
        setCurrentPage(updater.pageIndex); // Update currentPage
        console.log("Pagination changed:", updater);
      }
    },
    enableRowNumbers: true,

    muiTablePaperProps: {
      sx: {
        boxShadow: "none",
        "& .css-8k4lth": {
          // background: "green",
          // padding: "0",
          // fontSize: "8px",
        },
        "& .css-10gei56": {
          // padding: "0",
          // minHeight: "1.5rem",
          // background: "green",
        },
        "& .css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root": {
          // background: "red",
          // padding:"4px",
          // height:"1rem",
          // width:"1rem",
          minHeight: "1rem",
          minWidth: "1rem",
          maxHeight: "1.6rem",
          maxWidth: "1.6rem",
          aspectRatio: 1,
        },
        "& .MuiInputLabel-root, .MuiInputBase-root": {
          fontSize: "11px",
        },
      },
    },
    muiTableContainerProps: {
      sx: {
        boxShadow: "none",
        height: "auto",
        overflowX: "auto",
        "& .css-1w86f15": {
          // minWidth: "auto"
        },
      },
    },

    muiTableHeadProps: {
      sx: {
        boxShadow: "none",
        textAlign: "center",
        "& .MuiTableCell-root": {
          padding: "2px 0",
          // fontSize: "12px",
          // minWidth: "auto",
          // background: "red",
          // margin: "4px",
          // textAlign:"center",
          width: "max-content",
          minWidth: "fit-content",
        },
        ".css-c8wlay": {
          margin: "0 4px",
          // width:"fit-content"
        },
      },
    },
    muiTableBodyProps: {
      sx: {
        boxShadow: "none",
        // textAlign:"center",
        "& .MuiTableCell-root": {
          padding: "2px 4px",
          // fontSize: "12px",
          // textAlign:"center"
          wordWrap: "nowrap",
          textWrap: "nowrap",
          // fontSize: "12px",
          // fontSize: "12px",
          // textAlign: "center",
          width: "max-content",
          minWidth: "fit-content",
        },
      },
    },

    enableColumnFilterModes: false,
    enableColumnActions: false,
    enableSorting: true,
    enableColumnResizing: true,
    muiTableHeadCellProps: {
      sx: {
        // textTransform: "uppercase",
        // fontSize: "12px",
        // fontWeight: 700,
        // paddingX: "18px",
        // color: "red",
        // width: "fit-content",
        // background: "red",
        // minWidth: "auto",
        // marginRight: "4px",
        // minWidth: "auto",
        // width: "fit-content",
        // maxWidth: "150px",
        // textAlign: "center",
        //  background:"red",
        ".css-1t5kuvk": {
          wordWrap: "nowrap",
          textWrap: "nowrap",
          // fontSize: "12px",
          // fontSize: "12px",
          textAlign: "center",
        },
        ".MuiSvgIcon-root": {
          fontSize: "1rem",
        },
      },
    },
    muiTableBodyCellProps: {
      sx: {
        // fontSize: " 0.875rem",
        fontWeight: 400,
        textTransform: "capitalize",
        height: `${rowHeight}px`,
        padding: "0px",
        paddingLeft: "20px",
      },
    },
    // enableRowActions: true,
    // enableRowNumbers: true,
    rowNumberDisplayMode: "original",
    // positionActionsColumn: "last",
    // paginationDisplayMode: 'pages',

    // layoutMode: "grid-no-grow",
    // layoutMode: "grid",
    layoutMode: "semantic",
    // enableStickyHeader: true,
    // enableStickyFooter: true,

    // expand related
    muiExpandAllButtonProps: {
      sx: {
        borderRadius: "8px",
        ":hover": {
          background: "inherit",
        },
      },
    },
    muiExpandButtonProps: {
      sx: {
        borderRadius: "8px",
        ":hover": {
          background: "inherit",
        },
      },
    },

    enableTopToolbar: false,
  });

  return <MaterialReactTable key={tKey} table={table} />;
}
export default ExampleTable;
