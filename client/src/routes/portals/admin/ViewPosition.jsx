import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Snackbar } from '@mui/material';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

export default function ViewPosition() {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/viewPosition'); // Adjust the API endpoint accordingly
        setPositions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching positions:', error);
        setError('Error fetching positions. Please try again later.');
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  const handleCloseSnackbar = () => {
    setError(null);
  };

  return (
    <div>
      <Typography variant="h1" gutterBottom>All Positions</Typography>
      {loading && <CircularProgress />}
      {error && (
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={Boolean(error)}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={error}
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      )}
      <List>
        {positions.map(position => (
          <ListItem key={position.id}>
            <ListItemText
              primary={`ID: ${position.id}`}
              secondary={`Name: ${position.name}, Salary: ${position.salary}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
