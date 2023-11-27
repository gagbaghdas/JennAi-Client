import React, { useState } from 'react';
import { Grid, Typography, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit'; // Import Edit Icon
import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete Icon
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const Item = styled(Paper)(({ theme }) => ({
  position: 'relative', // Add relative positioning to the parent
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function DashboardItem({ title, itemKey, children, onClick, Id , onProjectDelete}) {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false); // State for the confirmation dialog

  const handleEditClick = (event) => {
    event.stopPropagation(); // Prevent the onClick of the parent Grid item from triggering
    navigate(`/edit/${itemKey}`);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation(); // Prevent triggering parent's onClick
    setOpenDialog(true); // Open the confirmation dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    api.delete(`/delete_project/${itemKey}`)
    .then(response => {
        if (response.status === 200) {
            // Optionally refresh the projects list or navigate
            console.log("Project deleted successfully");
            onProjectDelete(); 
            // You can refresh the list of projects here
        }
    })
    .catch(error => {
        console.error("Error deleting project:", error);
    });
setOpenDialog(false); // Close the dialog
  };

  return (
    <Grid item key={itemKey} onClick={onClick}>
      <Item sx={{ width: 200, height: 200, borderRadius: 10 }}>
        {itemKey !== "new_game" && (
          <IconButton 
            onClick={handleEditClick} 
            color="primary" 
            sx={{ position: 'absolute', top: 8, right: 8 }} // Position the icon button
          >
            <EditIcon />
          </IconButton>
        )}

         {/* Delete Icon */}
         {itemKey !== "new_game" && (
          <IconButton onClick={handleDeleteClick} color="secondary" sx={{ position: 'absolute', bottom: 8, right: 8 }}>
            <DeleteIcon />
          </IconButton>
        )}

        <Typography variant="h6" noWrap component="div">
          {title}
        </Typography>
        {children}
      </Item>
       {/* Confirmation Dialog */}
       <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{"Remove Project"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove {title}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="secondary">Remove</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default DashboardItem;
