import React from 'react';
import { Button, Box } from '@mui/material';

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
      <Button
        variant="contained"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        sx={{ bgcolor: '#bbc40c' , color:'#182a4c' , '&:hover': { bgcolor: '#182a4c' , color:'#bbc40c'  } } }
      >
        Previous
      </Button>
      <Button
        variant="contained"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        sx={{ bgcolor: '#bbc40c'  , color:'#182a4c' , '&:hover': { bgcolor: '#182a4c' , color:'#bbc40c' } }}
      >
        Next
      </Button>
    </Box>
  );
};

export default PaginationControls;