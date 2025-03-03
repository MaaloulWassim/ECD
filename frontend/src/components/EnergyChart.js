import React from 'react';
import { Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const EnergyChart = ({ data, compareData }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
      <LineChart width={1080} height={400} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="timestamp" 
          tickFormatter={(str) => new Date(str).toLocaleDateString()}
        />
        <YAxis />
        <Tooltip />
        <Legend />

        <Line
          type="monotone"
          dataKey="value"
          data={data}
          name="Energy Consumption"
          stroke="#bbc40c"
          dot={false}
        />
        {compareData && (
          <Line
            type="monotone"
            dataKey="value"
            data={compareData}
            name="Comparison"
            stroke="#82ca9d"
            dot={false}
          />
        )}
      </LineChart>
    </Box>
  );
};

export default EnergyChart;