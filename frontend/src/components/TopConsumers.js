import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Box } from '@mui/material';

const TopConsumers = ({ consumers }) => (
  <Box sx={{ maxWidth: 800, margin: '0 auto' }}>
    <List>
      {consumers.map((consumer) => (
        <ListItem key={consumer.name} sx={{ bgcolor: 'background.paper', mb: 1, borderRadius: 1 }}>
          <ListItemText primary={consumer.name} secondary={`${consumer.consumption} kWh`} />
        </ListItem>
      ))}
    </List>
  </Box>
);
export default TopConsumers;