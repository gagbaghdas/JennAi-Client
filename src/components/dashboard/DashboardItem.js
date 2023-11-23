import React from 'react';
import { Grid, Typography, Paper, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit'; // Import Edit Icon
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  position: 'relative', // Add relative positioning to the parent
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function DashboardItem({ title, itemKey, children, onClick, Id }) {
  const navigate = useNavigate();

  const handleEditClick = (event) => {
    event.stopPropagation(); // Prevent the onClick of the parent Grid item from triggering
    navigate(`/edit/${itemKey}`);
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
        <Typography variant="h6" noWrap component="div">
          {title}
        </Typography>
        {children}
      </Item>
    </Grid>
  );
}

export default DashboardItem;
