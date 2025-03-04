import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#f1fbfb' }} >
      <Toolbar>
        <Typography variant="h6"  sx={{ color: '#182a4c' }} > <p >ECD</p></Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;