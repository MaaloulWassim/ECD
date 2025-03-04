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
  const [compareData, setCompareData] = useState({ name1: null, name2: null });
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1); // current page
  const [totalPages, setTotalPages] = useState(1); // number of all pagees
  const [compareMode, setCompareMode] = useState(false);
  const [name1, setName1] = useState('');  // name of faciliy 1
  const [name2, setName2] = useState(''); // name of facility 2
  const [names, setNames] = useState([]); // List of unique names

  // Fetch unique names when the app loads : used for the items in the select menu
  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/energy/');
        console.log(response.data.unique_names)
        setNames(response.data.unique_names);
      } catch (error) {
        console.error('Error fetching names:', error);
      }
    };
    fetchNames();
  }, []);

  // fetch data for all filters and updating the total pages 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/energy/', {
          params: {
            energy_form: filters.energyForm,
            system_type: filters.systemType,
            start_date: filters.startDate,
            end_date: filters.endDate,
            page: currentPage,
            page_size: 4,
          },
        });
        setData(response.data);
        setTotalPages(Math.ceil(response.data.total_consumers / 4)); //calc the number of pages from the total of customers
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
      const [response1, response2] = await Promise.all([
        axios.get('http://localhost:8000/api/energy/', { params: { name: name1 } }),
        axios.get('http://localhost:8000/api/energy/', { params: { name: name2 } })
      ]);
  
      setCompareData({
        name1: response1.data,
        name2: response2.data,
      });
  
      setNames(prev => [
        ...new Set([...prev, name1, name2])
      ]);
    } catch (error) {
      console.error('Error fetching comparison data:', error);
    }
  };
  // reset button to reset all filt
  const resetFilters = () => {
    setFilters({
      energyForm: '',
      systemType: '',
      startDate: null,
      endDate: null,
    });
  };

const resetCompareMode = ()=>{
  if (window.confirm('Are you sure you want to reset the comparison?')) {
    setCompareMode(false);
    setName1('');
    setName2('');
    setCompareData({ name1: null, name2: null });
  }
}
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container sx={{ flexGrow: 1, py: 4 }}>
        <h1>Energy Consumption Dashboard</h1>
        <Button
          variant="contained"
          onClick={() => setCompareMode(!compareMode)}
          sx={{ bgcolor: '#bbc40c'  , color:'#182a4c' , '&:hover': { bgcolor: '#182a4c' , color:'#bbc40c' } }}
        >
          {compareMode ? 'Exit Compare Mode' : 'Enter Compare Mode'}
        </Button>

        {compareMode ? (
          <>
           <Box sx={{ display: 'flex', gap: 4, mb: 4 }}>
              <TextField
                select
                label="Name 1"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                sx={{ minWidth: 200 }}
              >
                <MenuItem value="">Select Name</MenuItem>
                {names.map((name) => (
                  <MenuItem key={name} value={name}>{name}</MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Name 2"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                sx={{ minWidth: 200 }}
              >
                <MenuItem value="">Select Name</MenuItem>
                {names.map((name) => (
                  <MenuItem key={name} value={name}>{name}</MenuItem>
                ))}
              </TextField>
              <Button
                variant="contained"
                onClick={handleCompare}
                
                sx={{ bgcolor: '#bbc40c'  , color:'#182a4c' , '&:hover': { bgcolor: '#182a4c' , color:'#bbc40c' } }}
              >
                Compare
              </Button>
              <Button
                variant="contained"
                onClick={resetCompareMode}
                disabled={!name1 && !name2}
                sx={{ bgcolor: '#ff5722', color: '#fff', '&:hover': { bgcolor: '#e64a19' } }}
              >
                Reset
              </Button>
            </Box>
            <Box>
              <Typography variant="h6">Name 1: {name1}</Typography>
              <EnergyChart data={compareData.name1?.total_consumption || []} />
            </Box>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">Name 2: {name2}</Typography>
              <EnergyChart data={compareData.name2?.total_consumption || []} />
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
                customInput={
                  <TextField
                    sx={{ minWidth: 200 }}
                    label="Date Range"
                    variant="outlined"
                    fullWidth
                  />}
              />
              <Button
                variant="contained"
                onClick={() => setFilters({ ...filters })}
                sx={{ bgcolor: '#bbc40c'  , color:'#182a4c' , '&:hover': { bgcolor: '#182a4c' , color:'#bbc40c' } }}
              >
                Apply Filters
              </Button>
              <Button
                variant="contained"
                onClick={resetFilters}
                sx={{ bgcolor: '#ff5722', color: '#fff', '&:hover': { bgcolor: '#e64a19' } }}
              >
                Reset Filters
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