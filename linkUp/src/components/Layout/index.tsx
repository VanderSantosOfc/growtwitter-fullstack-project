import { Box, Container, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { Home, Search, Person, Logout as LogoutIcon } from '@mui/icons-material'; 
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks'; 
import { setLogout } from '../../store/slices/authSlice'; 

import { Sidebar } from '../Sidebar';
import { Suggestions } from '../Suggestions';
import { SearchBar } from '../SearchBar'; 

export const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const myId = user?.id || user?._id;

  const handleLogout = () => {
    
      dispatch(setLogout()); 
      navigate('/login');
    
  };

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', minHeight: '100vh', p: 0 }}>
      
      {/* SIDEBAR (Desktop) */}
      <Box sx={{ 
        width: { xs: '0px', sm: '80px', md: '250px' }, 
        display: { xs: 'none', sm: 'block' }, 
        borderRight: '1px solid #EFF3F4',
        position: 'sticky', top: 0, height: '100vh'
      }}>
        <Sidebar />
      </Box>

      {/* CONTEÚDO PRINCIPAL */}
      <Box component="main" sx={{ 
        flex: 1, 
        maxWidth: { xs: '100%', md: '600px' }, 
        borderRight: '1px solid #EFF3F4',
        pb: { xs: 7, md: 0 } 
      }}>
        <Outlet />
      </Box>

      {/* COLUNA DIREITA (Desktop) */}
      <Box sx={{ 
        width: '350px', 
        display: { xs: 'none', lg: 'block' }, 
        p: 2, position: 'sticky', top: 0, height: 'fit-content'
      }}>
        <SearchBar /> 
        <Suggestions />
      </Box>

      {/* MENU INFERIOR (Mobile) */}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: { xs: 'block', sm: 'none' }, zIndex: 1000 }} elevation={3}>
        <BottomNavigation showLabels>
          <BottomNavigationAction 
            label="Home" 
            icon={<Home />} 
            onClick={() => navigate('/home')} 
          />
          <BottomNavigationAction 
            label="Explorar" 
            icon={<Search />} 
            onClick={() => navigate('/explore')} 
          />
          <BottomNavigationAction 
            label="Perfil" 
            icon={<Person />} 
            onClick={() => navigate(`/profile/${myId}`)} 
          />
          <BottomNavigationAction 
            label="Sair" 
            icon={<LogoutIcon sx={{ color: '#F4212E' }} />} 
            onClick={handleLogout} 
          />
        </BottomNavigation>
      </Paper>

    </Container>
  );
};