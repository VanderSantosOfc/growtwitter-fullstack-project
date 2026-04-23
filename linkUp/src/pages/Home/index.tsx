import { useState, useEffect, useCallback } from 'react';
import { Box, TextField, Button, Typography, CircularProgress, Grid } from '@mui/material';

import { tweetService } from '../../services/tweetService';
import { TweetCard } from '../../components/TweetCard';
import { useAppSelector } from '../../store/hooks';

export const Home = () => {
  const [content, setContent] = useState('');
  const [tweets, setTweets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAppSelector((state) => state.auth);

  const loadTweets = useCallback(async () => {
    try {
      setLoading(true);
      const userId = user?.id || user?._id;

      const [feedRes, myTweetsRes] = await Promise.all([
        tweetService.getFeed(),
        userId ? tweetService.getByUser(userId) : Promise.resolve({ success: true, data: [] })
      ]);

      if (feedRes.success && myTweetsRes.success) {
        const combined = [...(feedRes.data || []), ...(myTweetsRes.data || [])];
        const unique = combined.filter((t, i, s) => i === s.findIndex((obj) => obj.id === t.id));
        setTweets(unique.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      }
    } catch (error) {
      console.error("Erro Home:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { loadTweets(); }, [loadTweets]);

  const handlePost = async () => {
    if (!content.trim()) return;
    try {
      const res = await tweetService.create(content);
      if (res.success) {
        setContent('');
        await loadTweets();
      }
    } catch (e) { console.error(e); }
  };

  return (
    <Box>
      <Box sx={{ p: 2, borderBottom: '1px solid #EFF3F4', position: 'sticky', top: 0, bgcolor: 'white', zIndex: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Página Inicial</Typography>
      </Box>

      <Box sx={{ p: 2, borderBottom: '1px solid #EFF3F4' }}>
        <Grid container spacing={2}>
          <Grid size={12}> 
            <TextField 
              fullWidth 
              multiline 
              rows={3} 
              variant="standard" 
              placeholder="O que está acontecendo?" 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              slotProps={{ input: { disableUnderline: true } }} 
              sx={{ "& .MuiInputBase-root": { fontSize: '1.2rem' } }}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
          <Button variant="contained" onClick={handlePost} disabled={!content.trim()} sx={{ borderRadius: '20px', fontWeight: 'bold', px: 3 }}>
            Postar
          </Button>
        </Box>
      </Box>

      {loading && tweets.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress size={30} /></Box>
      ) : (
        tweets.map((t) => <TweetCard key={t.id} tweet={t} onUpdate={loadTweets} />)
      )}
    </Box>
  );
};
