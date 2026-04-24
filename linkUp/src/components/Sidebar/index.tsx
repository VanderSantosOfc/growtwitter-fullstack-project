import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Avatar } from '@mui/material';
import { Home, Search, Person, Logout } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setLogout } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.auth);

  const menuItems = [
    { text: 'Página Inicial', icon: <Home fontSize="large" />, path: '/home' },
    { text: 'Explorar', icon: <Search fontSize="large" />, path: '/explore' },
    { 
      text: 'Perfil', 
      icon: <Person fontSize="large" />, 
      path: (user?.id || user?._id) ? `/profile/${user.id || user._id}` : '/login' 
    },
  ];

  const handleLogout = () => {
    dispatch(setLogout());
    localStorage.removeItem('persist:root'); 
    navigate('/login');
  };

  return (
    <Box sx={{ 
      height: { xs: 'auto', sm: '100vh' }, 
      display: 'flex', 
      flexDirection: { xs: 'row', sm: 'column' }, 
      justifyContent: 'space-between', 
      p: { xs: 0, sm: 2 },
      position: { xs: 'fixed', sm: 'relative' },
      bottom: { xs: 0, sm: 'auto' },
      width: { xs: '100%', sm: 'auto' },
      bgcolor: 'white',
      borderTop: { xs: '1px solid #EFF3F4', sm: 'none' },
      zIndex: 1000
    }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'row', sm: 'column' }, 
        width: '100%', 
        justifyContent: { xs: 'space-around', sm: 'flex-start' } 
      }}>
        <Typography 
          color="primary" 
          sx={{ 
            fontWeight: 'bold', 
            mb: 3, 
            display: { xs: 'none', md: 'block' }, 
            p: 1 
          }}
        >
          LinkUp
        </Typography>
        <List sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'row', sm: 'column' }, 
          p: 0, 
          width: { xs: '100%', sm: 'auto' } 
        }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ width: 'auto' }}>
              <ListItemButton 
                onClick={() => navigate(item.path)} 
                sx={{ 
                  borderRadius: 8, 
                  mb: { xs: 0, sm: 1 }, 
                  px: { xs: 2, sm: 2 },
                  justifyContent: 'center'
                }}
              >
                <ListItemIcon sx={{ minWidth: { xs: 0, sm: 40 }, justifyContent: 'center' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={<Typography variant="h6" sx={{ fontWeight: '500' }}>{item.text}</Typography>} 
                  sx={{ display: { xs: 'none', md: 'block' } }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <ListItemButton 
          onClick={handleLogout} 
          sx={{ borderRadius: 8, mb: 1, '&:hover': { bgcolor: '#fee7e7', color: 'red' } }}
        >
          <ListItemIcon><Logout /></ListItemIcon>
          <ListItemText primary={<Typography variant="body1" sx={{ fontWeight: 'bold' }}>Sair</Typography>} />
        </ListItemButton>
        <Box sx={{ p: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar src={user?.imageUrl || ''} sx={{ width: 40, height: 40 }} />
          <Box sx={{ overflow: 'hidden', display: { xs: 'none', md: 'block' } }}>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">@{user?.username}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};