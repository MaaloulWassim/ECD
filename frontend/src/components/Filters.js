import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TextField, MenuItem, Button } from '@mui/material';
import { Box } from '@mui/material';


const Filters = ({ onFilter }) => {
  const [energyForm, setEnergyForm] = useState('');
  const [systemType, setSystemType] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);

  const handleSubmit = () => {
    onFilter({
      energyForm,
      systemType,
      startDate: dateRange[0] ? dateRange[0].toISOString().split('T')[0] : null,
      endDate: dateRange[1] ? dateRange[1].toISOString().split('T')[0] : null,
    });
  };

  return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
        <TextField
          select
          label="Energy Form"
          value={energyForm}
          onChange={(e) => setEnergyForm(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Electricity">Electricity</MenuItem>
          <MenuItem value="Heat">Heat</MenuItem>
          <MenuItem value="Cold">Cold</MenuItem>
        </TextField>

        <TextField
          select
          label="System Type"
          value={systemType}
          onChange={(e) => setSystemType(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Building">Building</MenuItem>
          <MenuItem value="Store">Store</MenuItem>
          <MenuItem value="Production Warehouse">Production Warehouse</MenuItem>
        </TextField>
      <DatePicker
        selectsRange
        startDate={dateRange[0]}
        endDate={dateRange[1]}
        onChange={(update) => setDateRange(update)}
        wrapperClassName="date-picker"
        sx={{color:'f1fbfb'}}
      /> 


      <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: '#bbc40c'  , color:'#182a4c' , '&:hover': { bgcolor: '#182a4c' , color:'#bbc40c' }, height: 56 }}>
        Apply Filters
      </Button>
    </Box>

  );
};

export default Filters;