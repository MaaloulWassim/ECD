import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#182a4c', color: 'white', p: 2, mt: 'auto' }}>
      <Typography variant="body1" align="center">
        © 2025 Energy Provider. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;