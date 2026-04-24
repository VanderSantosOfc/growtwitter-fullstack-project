import { useState, useEffect } from 'react';
import { Box, Typography, TextField, InputAdornment, List, ListItem, ListItemAvatar, Avatar, ListItemText, Paper } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { tweetService } from '../../services/tweetService';

export const Explore = () => {
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
    <Box sx={{ width: '100%' }}>
      <Box sx={{ p: 2, display: { xs: 'block', sm: 'none' }, borderBottom: '1px solid #eff3f4' }}>
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
          <Paper sx={{ mt: 1, boxShadow: 3 }}>
            <List>
              {results.map((u) => (
                <ListItem 
                  key={u.id} 
                  onClick={() => { navigate(`/profile/${u.id}`); setQuery(''); }}
                  sx={{ cursor: 'pointer', '&:hover': { bgcolor: '#f5f5f5' } }}
                >
                  <ListItemAvatar>
                    <Avatar src={u.imageUrl}>{u.name[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={u.name} secondary={`@${u.username}`} />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </Box>

      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          O que está acontecendo
        </Typography>
      </Box>

      <List>
        <ListItem sx={{ display: 'block', borderBottom: '1px solid #f7f9f9', py: 1.5 }}>
          <Typography variant="caption" color="textSecondary">Tendência em Brasil</Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>#ReactJS</Typography>
          <Typography variant="caption" color="textSecondary">10.5 mil posts</Typography>
        </ListItem>
      </List>
    </Box>
  );
};