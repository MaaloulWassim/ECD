import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import Filters from './components/Filters';
import EnergyChart from './components/EnergyChart';
import TopConsumers from './components/TopConsumers';
import PaginationControls from './components/PaginationControls';

const App = () => {
  const [data, setData] = useState({ total_consumption: [], top_consumers: [] });
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/energy/', {
          params: {
            ...filters,
            page: currentPage,
            page_size: 4, // Show 4 consumers per page
          },
        });
        setData(response.data);
        setTotalPages(Math.ceil(response.data.total_consumers / 4)); // Calculate total pages
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [filters, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container sx={{ flexGrow: 1, py: 4 }}>
        <h1>Energy Consumption Dashboard</h1>
        <Filters onFilter={setFilters} />
        <EnergyChart data={data.total_consumption} />
        <h2>Top Consumers</h2>
        <TopConsumers consumers={data.top_consumers} />
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Container>
      <Footer />
    </Box>
  );
};

export default App;