import { useState, useEffect } from 'react';
import { Box, TextField, List, ListItem, ListItemAvatar, Avatar, ListItemText, Paper, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { tweetService } from '../../services/tweetService';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const searchUsers = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }
      const res = await tweetService.listUsers();
      if (res.success) {
        const filtered = res.data.filter((u: any) =>
          u.name.toLowerCase().includes(query.toLowerCase()) ||
          u.username.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered.slice(0, 5)); 
      }
    };
    const timer = setTimeout(searchUsers, 300); 
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <Box sx={{ position: 'relative', mb: 2 }}>
      <TextField
        fullWidth
        placeholder="Buscar usuários"
        variant="outlined"
        size="small"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: 'gray' }} />
              </InputAdornment>
            ),
            sx: { borderRadius: 10, bgcolor: '#eff3f4', '& fieldset': { border: 'none' } }
          }
        }}
      />
      {results.length > 0 && (
        <Paper sx={{ position: 'absolute', width: '100%', zIndex: 10, mt: 1, boxShadow: 3 }}>
          <List>
            {results.map((u) => (
              <ListItem key={u.id} disablePadding>
                <Box 
                  onClick={() => { navigate(`/profile/${u.id}`); setQuery(''); }}
                  sx={{ display: 'flex', alignItems: 'center', p: 1.5, width: '100%', cursor: 'pointer', '&:hover': { bgcolor: '#f5f5f5' } }}
                >
                  <ListItemAvatar>
                    <Avatar src={u.imageUrl}>{u.name ? u.name[0] : '?'}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={u.name} secondary={`@${u.username}`} />
                </Box>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};