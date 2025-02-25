import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, Button, Typography, TextField, MenuItem } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Header from './components/Header';
import Footer from './components/Footer';
import EnergyChart from './components/EnergyChart';
import TopConsumers from './components/TopConsumers';
import PaginationControls from './components/PaginationControls';

const App = () => {
  const [data, setData] = useState({ total_consumption: [], top_consumers: [] });
  const [compareData, setCompareData] = useState({ facility1: null, facility2: null });
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [compareMode, setCompareMode] = useState(false);
  const [facility1, setFacility1] = useState('');
  const [facility2, setFacility2] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/energy/', {
          params: {
            ...filters,
            page: currentPage,
            page_size: 4,
          },
        });
        setData(response.data);
        setTotalPages(Math.ceil(response.data.total_consumers / 4));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [filters, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleCompare = async () => {
    try {
      const response1 = await axios.get('http://localhost:8000/api/energy/', {
        params: { facility: facility1 },
      });
      const response2 = await axios.get('http://localhost:8000/api/energy/', {
        params: { facility: facility2 },
      });
      setCompareData({
        facility1: response1.data,
        facility2: response2.data,
      });
    } catch (error) {
      console.error('Error fetching comparison data:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container sx={{ flexGrow: 1, py: 4 }}>
        <h1>Energy Consumption Dashboard</h1>
        <Button
          variant="contained"
          onClick={() => setCompareMode(!compareMode)}
          sx={{ mb: 2, bgcolor: '#4CAF50', '&:hover': { bgcolor: '#45a049' } }}
        >
          {compareMode ? 'Exit Compare Mode' : 'Enter Compare Mode'}
        </Button>

        {compareMode ? (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>Compare Facilities</Typography>
            <Box sx={{ display: 'flex', gap: 4, mb: 4 }}>
              <TextField
                select
                label="Facility 1"
                value={facility1}
                onChange={(e) => setFacility1(e.target.value)}
                sx={{ minWidth: 200 }}
              >
                <MenuItem value="">Select Facility</MenuItem>
                <MenuItem value="Factory A">Factory A</MenuItem>
                <MenuItem value="Building B">Building B</MenuItem>
                <MenuItem value="Office C">Office C</MenuItem>
                <MenuItem value="Warehouse D">Warehouse D</MenuItem>
                <MenuItem value="Store E">Store E</MenuItem>
              </TextField>
              <TextField
                select
                label="Facility 2"
                value={facility2}
                onChange={(e) => setFacility2(e.target.value)}
                sx={{ minWidth: 200 }}
              >
                <MenuItem value="">Select Facility</MenuItem>
                <MenuItem value="Factory A">Factory A</MenuItem>
                <MenuItem value="Building B">Building B</MenuItem>
                <MenuItem value="Office C">Office C</MenuItem>
                <MenuItem value="Warehouse D">Warehouse D</MenuItem>
                <MenuItem value="Store E">Store E</MenuItem>
              </TextField>
              <Button
                variant="contained"
                onClick={handleCompare}
                sx={{ height: 56, bgcolor: '#4CAF50', '&:hover': { bgcolor: '#45a049' } }}
              >
                Compare
              </Button>
            </Box>
            <Box>
              <Typography variant="h6">Facility 1: {facility1}</Typography>
              <EnergyChart data={compareData.facility1?.total_consumption || []} />
              <TopConsumers consumers={compareData.facility1?.top_consumers || []} />
            </Box>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">Facility 2: {facility2}</Typography>
              <EnergyChart data={compareData.facility2?.total_consumption || []} />
              <TopConsumers consumers={compareData.facility2?.top_consumers || []} />
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
              <TextField
                select
                label="Energy Form"
                value={filters.energyForm || ''}
                onChange={(e) => setFilters({ ...filters, energyForm: e.target.value })}
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
                value={filters.systemType || ''}
                onChange={(e) => setFilters({ ...filters, systemType: e.target.value })}
                sx={{ minWidth: 200 }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Building">Building</MenuItem>
                <MenuItem value="Store">Store</MenuItem>
                <MenuItem value="Production Warehouse">Production Warehouse</MenuItem>
              </TextField>
              <DatePicker
                selectsRange
                startDate={filters.startDate}
                endDate={filters.endDate}
                onChange={(update) => setFilters({ ...filters, startDate: update[0], endDate: update[1] })}
                placeholderText="Select date range"
              />
              <Button
                variant="contained"
                onClick={() => setFilters({ ...filters })}
                sx={{ height: 56, bgcolor: '#4CAF50', '&:hover': { bgcolor: '#45a049' } }}
              >
                Apply Filters
              </Button>
            </Box>
            <EnergyChart data={data.total_consumption} />
            <h2>Top Consumers</h2>
            <TopConsumers consumers={data.top_consumers} />
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default App;