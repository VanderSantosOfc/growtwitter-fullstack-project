import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar';
import { Suggestions } from '../Suggestions';
import { SearchBar } from '../SearchBar'; 

export const Layout = () => {
  return (
    <Container maxWidth="lg" sx={{ display: 'flex', minHeight: '100vh', p: 0 }}>
      
      <Box sx={{ 
        width: { xs: '70px', md: '250px' }, 
        borderRight: '1px solid #EFF3F4',
        position: 'sticky',
        top: 0,
        height: '100vh'
      }}>
        <Sidebar />
      </Box>

      <Box component="main" sx={{ 
        flex: 1, 
        maxWidth: '600px', 
        borderRight: '1px solid #EFF3F4' 
      }}>
        <Outlet />
      </Box>

      <Box sx={{ 
        width: '350px', 
        display: { xs: 'none', lg: 'block' }, 
        p: 2,
        position: 'sticky',
        top: 0,
        height: 'fit-content'
      }}>
        
        <SearchBar /> 
        <Suggestions />
      </Box>

    </Container>
  );
};
