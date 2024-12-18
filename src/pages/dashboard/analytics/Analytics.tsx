import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import CustomizedDialogs from "./components/CustomizedDialogs";
import { color } from "chart.js/helpers";

const Analytics = () => {
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const buttonStyles = {
    background: "linear-gradient(258deg, #003fe9 0%, #26e6aa 100%)",
    color: "#fff",
    border: "none",
    "&:hover": {
      background:"linear-gradient(71deg, #003fe9 0%, #26e6aa 100%)",
    },
  };

  const columns: GridColDef[] = [
    {
      field: "action",
      headerName: " Action",
      width: 200,
      renderCell: (params) => {
        return (
          <Button
            variant="text"
            onClick={() => handleViewClick(params.row)}
            sx={buttonStyles}
          >
            View
          </Button>
        );
      },
    },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
    },
    {
      field: "email",
      headerName: " Email",
      width: 200,
    },
    {
      field: "department",
      headerName: " Department",
      width: 200,
    },
    {
      field: "problem",
      headerName: " Issue",
      width: 200,
    },
    {
      field: "status",
      headerName: " Status",
      width: 200,
    },
    {
      field: "priority",
      headerName: " Priority",
      width: 200,
    },
    {
      field: "assignedto",
      headerName: " Assigned To",
      width: 200,
    },
    {
      field: "datecreated",
      headerName: " DateCreated",
      width: 200,
    },
    {
      field: "dateresolved",
      headerName: " DateResolved",
      width: 200,
    },
  ];

  const rows = [
    {
      id: 1,
      firstName: "Jon",
      lastName: "Snow",
      email: "Jon.Snow@cdasolutions.co.za",
      department: "IT Support",
      problem: "System crash",
      status: "Open",
      priority: "High",
      assignedto: "Cersei Lannister",
      datecreated: "2024-12-01",
      dateresolved: "",
      action: "",
    },
    {
      id: 2,
      firstName: "Cersei",
      lastName: "Lannister",
      email: "Cersei.Lannister@cdasolutions.co.za",
      department: "IT Support",
      problem: "Network issue",
      status: "In Progress",
      priority: "Medium",
      assignedto: "Jon Snow",
      datecreated: "2024-12-02",
      dateresolved: "",
      action: "",
    },
    {
      id: 3,
      firstName: "Jaime",
      lastName: "Lannister",
      email: "Jaime.Lannister@cdasolutions.co.za",
      department: "HR",
      problem: "Access issue",
      status: "Closed",
      priority: "Low",
      assignedto: "Arya Stark",
      datecreated: "2024-11-30",
      dateresolved: "2024-12-03",
      action: "",
    },
    {
      id: 4,
      firstName: "Arya",
      lastName: "Stark",
      email: "Arya.Stark@cdasolutions.co.za",
      department: "IT Support",
      problem: "Software bug",
      status: "Open",
      priority: "High",
      assignedto: "Jaime Lannister",
      datecreated: "2024-12-03",
      dateresolved: "",
      action: "",
    },
    {
      id: 5,
      firstName: "Daenerys",
      lastName: "Targaryen",
      email: "Daenerys.Targaryen@cdasolutions.co.za",
      department: "Development",
      problem: "Code conflict",
      status: "In Progress",
      priority: "Medium",
      assignedto: "Jon Snow",
      datecreated: "2024-12-04",
      dateresolved: "",
      action: "",
    },
    {
      id: 6,
      firstName: "Emily",
      lastName: "Melisandre",
      email: "Emily.Melisandre@cdasolutions.co.za",
      department: "HR",
      problem: "Document issue",
      status: "Closed",
      priority: "Low",
      assignedto: "Arya Stark",
      datecreated: "2024-11-28",
      dateresolved: "2024-12-02",
      action: "",
    },
    {
      id: 7,
      firstName: "Ferrara",
      lastName: "Clifford",
      email: "Ferrara.Clifford@cdasolutions.co.za",
      department: "IT Support",
      problem: "Server down",
      status: "Open",
      priority: "High",
      assignedto: "Cersei Lannister",
      datecreated: "2024-12-05",
      dateresolved: "",
      action: "",
    },
    {
      id: 8,
      firstName: "Rossini",
      lastName: "Frances",
      email: "Rossini.Frances@cdasolutions.co.za",
      department: "Marketing",
      problem: "Ad issue",
      status: "In Progress",
      priority: "Low",
      assignedto: "Arya Stark",
      datecreated: "2024-12-06",
      dateresolved: "",
      action: "",
    },
    {
      id: 9,
      firstName: "Roxie",
      lastName: "Harvey",
      email: "Roxie.Harvey@cdasolutions.co.za",
      department: "Sales",
      problem: "Login issue",
      status: "Closed",
      priority: "Medium",
      assignedto: "Jon Snow",
      datecreated: "2024-12-07",
      dateresolved: "2024-12-08",
      action: "",
    },
  ];

  const handleViewClick = (row: any) => {
    setSelectedRow(row);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedRow(null);
  };

  return (
    <Box sx={{ height: 400, width: "100%", mt: 13 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
      <CustomizedDialogs
        open={dialogOpen}
        onClose={handleCloseDialog}
        rowData={selectedRow}
      />
    </Box>
  );
};

export default Analytics;
