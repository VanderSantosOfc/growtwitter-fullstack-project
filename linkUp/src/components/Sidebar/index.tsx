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
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2 }}>
      <Box>
        <Typography color="primary" sx={{ fontSize: 35, mb: 2, ml: 1, fontWeight:'bold' }} >LinkUp</Typography>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)} sx={{ borderRadius: 8, mb: 1 }}>
                <ListItemIcon color="inherit">{item.icon}</ListItemIcon>
                <ListItemText primary={<Typography variant="h6" sx={{ fontWeight: '500' }}>{item.text}</Typography>} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box>
        <ListItemButton 
          onClick={handleLogout} 
          sx={{ borderRadius: 8, mb: 1, '&:hover': { bgcolor: '#fee7e7', color: 'red' } }}
        >
          <ListItemIcon><Logout /></ListItemIcon>
          <ListItemText primary={<Typography variant="body1" sx={{ fontWeight: 'bold' }}>Sair</Typography>} />
        </ListItemButton>

        <Box sx={{ p: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar src={user?.imageUrl || ''} sx={{ width: 40, height: 40 }} />
          <Box sx={{ overflow: 'hidden' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              @{user?.username}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
