import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Box } from '@mui/material';

const EnergyChart = ({ data }) => {
  console.log("Chart Data:", data);
  return(
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
  <LineChart width={1080} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="timestamp" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="value" stroke="#bbc40c" />
    </LineChart>
    </Box>)
};

export default EnergyChart;