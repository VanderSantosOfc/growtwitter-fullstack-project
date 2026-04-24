import { useState, useEffect, useCallback } from 'react';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
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
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadTweets();
  }, [loadTweets]);

  const handlePost = async () => {
    try {
      const res = await tweetService.create(content);
      if (res.success) {
        setContent('');
        await loadTweets();
      }
    } catch (e) { 
      console.error(e); 
    }
  };

  return (
    <Box>
      <Box sx={{ 
        p: 2, 
        borderBottom: '1px solid #EFF3F4', 
        position: 'sticky', 
        top: 0, 
        bgcolor: 'rgba(255, 255, 255, 0.85)', 
        backdropFilter: 'blur(12px)',
        zIndex: 10 
      }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Página Inicial</Typography>
      </Box>

      <Box sx={{ p: 2, borderBottom: '1px solid #EFF3F4' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <TextField 
            fullWidth 
            multiline 
            rows={3} 
            variant="standard" 
            placeholder="O que está acontecendo?" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            slotProps={{
              input: {
                disableUnderline: true,
              },
            }}
            sx={{ 
              "& .MuiInputBase-root": { 
                fontSize: { xs: '1.1rem', sm: '1.2rem' },
                lineHeight: 1.2
              } 
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Button 
              variant="contained" 
              onClick={handlePost} 
              disabled={!content.trim()} 
              sx={{ 
                borderRadius: '20px', 
                fontWeight: 'bold', 
                px: 3,
                textTransform: 'none',
                boxShadow: 'none'
              }}
            >
              Postar
            </Button>
          </Box>
        </Box>
      </Box>

      {loading && tweets.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
          <CircularProgress size={30} />
        </Box>
      ) : (
        <Box sx={{ pb: { xs: 2, sm: 0 } }}>
          {tweets.map((t) => (
            <TweetCard key={t.id} tweet={t} onUpdate={loadTweets} />
          ))}
        </Box>
      )}
    </Box>
  );
};