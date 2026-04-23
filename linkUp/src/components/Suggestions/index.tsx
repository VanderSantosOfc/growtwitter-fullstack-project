import { useEffect, useState } from 'react';
import { Box, Paper, Typography, Avatar, Stack, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { tweetService } from '../../services/tweetService';
import { useAppSelector } from '../../store/hooks';

export const Suggestions = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user: loggedUser } = useAppSelector((state) => state.auth);

  const loadSuggestions = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      const res = await tweetService.listUsers();
      
      if (res.success) {
        const currentLoggedId = loggedUser?.id || loggedUser?._id;
        
        const filtered = res.data.filter((u: any) => u.id !== currentLoggedId);
        
        
        setUsers(filtered.sort(() => 0.5 - Math.random()).slice(0, 3));
      }
    } catch (e) {
      console.error("Erro ao carregar sugestões:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    setUsers([]); 
    loadSuggestions(); 
  }, [loggedUser]); 

  if (loading && users.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 2, bgcolor: '#f7f9f9', borderRadius: 4, mt: 2 }} variant="outlined">
      <Typography variant="h6" sx={{ fontWeight: "800", mb: 2 }}>Quem seguir</Typography>
      
      <Stack spacing={3}>
        {users.map((u) => (
          <Box 
            key={u.id} 
            onClick={() => navigate(`/profile/${u.id}`)}
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1.5, 
              cursor: 'pointer', 
              p: 1,
              borderRadius: 2,
              transition: '0.2s',
              "&:hover": { 
                bgcolor: 'rgba(0,0,0,0.03)',
                opacity: 0.9 
              } 
            }}
          >
            <Avatar 
              src={u.imageUrl} 
              sx={{ bgcolor: '#1d9bf0', width: 40, height: 40 }}
            >
              {u.name[0]}
            </Avatar>
            
            <Box sx={{ overflow: 'hidden' }}>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  fontWeight: "bold", 
                  whiteSpace: 'nowrap', 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis' 
                }}
              >
                {u.name}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                @{u.username}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>

      {users.length === 0 && !loading && (
        <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1, textAlign: 'center' }}>
          Nenhuma sugestão no momento.
        </Typography>
      )}
    </Paper>
  );
};
