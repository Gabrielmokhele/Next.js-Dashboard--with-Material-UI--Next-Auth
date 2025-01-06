import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Stack, Typography } from "@mui/material";
import ResponsiveDialog from "./components/ResponsiveDialog";
import AlertDialog from "./components/AlertDialog";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Subject {
  id: string;
  subject: string;
  createdAt: string;
  updatedAt: string;
}

interface QuestionData {
  id: string;
  question: string;
  createdAt: string;
  subject: Subject;
}

export default function Questions() {
  const { data: queryData, isLoading, error } = useQuery({
    queryKey: ['subject'],
    queryFn: () => axios.get("http://localhost:5000/QuestionsandSubjects"),
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const columns: GridColDef[] = [
    {
      field: "subjectName", // Changed from 'subject' to 'subjectName'
      headerName: "Subject(s)",
      width: 200,
    },
    {
      field: "question",
      headerName: "Question(s)",
      width: 700,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
    //   valueFormatter: (params) => formatDate(params.value),
    }
  ];

  const rows = React.useMemo(() => {
    if (!queryData?.data?.data) return [];
    
    console.log('Data being processed:', queryData.data.data);
    
    return queryData.data.data.map((item: QuestionData) => ({
      id: item.id,
      subjectName: item.subject.subject, // Extract the subject name here
      question: item.question,
      createdAt: item.createdAt
    }));
  }, [queryData]);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading data: {error.toString()}</Typography>;

  return (
    <Box sx={{ height: 400, width: "90%", mt: 13, ml: 13 }}>
      <Typography variant="h4" gutterBottom>
        Questions
      </Typography>
      <Stack
        spacing={2}
        direction="row"
        display="flex"
        justifyContent="flex-end"
      >
        <ResponsiveDialog />
        <AlertDialog />
      </Stack>
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
        sx={{ mt: 2 }}
      />
    </Box>
  );
}