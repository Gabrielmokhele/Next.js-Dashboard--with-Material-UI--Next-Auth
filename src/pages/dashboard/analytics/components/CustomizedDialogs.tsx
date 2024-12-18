import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Define the props interface
interface CustomizedDialogsProps {
  open: boolean;
  onClose: () => void;
  rowData: any;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs({ 
  open, 
  onClose, 
  rowData 
}: CustomizedDialogsProps) {
  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      sx={{ '& .MuiPaper-root': { width: '80%' } }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Ticket Details
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        {rowData && (
          <>
            <Typography gutterBottom>
              <strong>Name:</strong> {rowData.firstName} {rowData.lastName}
            </Typography>
            <Typography gutterBottom>
              <strong>Email:</strong> {rowData.email}
            </Typography>
            <Typography gutterBottom>
              <strong>Department:</strong> {rowData.department}
            </Typography>
            <Typography gutterBottom>
              <strong>Issue:</strong> {rowData.problem}
            </Typography>
            <Typography gutterBottom>
              <strong>Status:</strong> {rowData.status}
            </Typography>
            <Typography gutterBottom>
              <strong>Priority:</strong> {rowData.priority}
            </Typography>
            <Typography gutterBottom>
              <strong>Assigned To:</strong> {rowData.assignedto}
            </Typography>
            <Typography gutterBottom>
              <strong>Date Created:</strong> {rowData.datecreated}
            </Typography>
            {rowData.dateresolved && (
              <Typography gutterBottom>
                <strong>Date Resolved:</strong> {rowData.dateresolved}
              </Typography>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant='text' autoFocus onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}