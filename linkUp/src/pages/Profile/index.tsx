import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Avatar, CircularProgress, Button, Divider } from '@mui/material';
import api from '../../services/api';
import { tweetService } from '../../services/tweetService';
import { TweetCard } from '../../components/TweetCard';
import { useAppSelector } from '../../store/hooks';

export const Profile = () => {
  const { userId } = useParams();
  const { user: loggedUser } = useAppSelector((state) => state.auth);
  const [user, setUser] = useState<any>(null);
  const [tweets, setTweets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const currentLoggedId = loggedUser?.id || loggedUser?._id;
  const isFollowing = !!user?.followers?.some((f: any) => {
    const followerIdFromDB = f.followerId || f.id || f;
    return currentLoggedId && followerIdFromDB === currentLoggedId;
  });

  const isMyProfile = currentLoggedId === userId;

  const fetchData = async () => {
    try {
      setLoading(true);
      const [uRes, tRes] = await Promise.all([
        api.get(`/users/${userId}`),
        tweetService.getByUser(userId!)
      ]);
      setUser(uRes.data.data);
      setTweets(tRes.data || []);
    } catch (e) { 
      console.error("Erro ao buscar dados do perfil:", e); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { 
    setUser(null); 
    fetchData(); 
  }, [userId, currentLoggedId]); 

  const toggleFollow = async () => {
    try {
      if (isFollowing) {
        await tweetService.unfollow(userId!);
      } else {
        await tweetService.follow(userId!);
      }
      await fetchData(); 
    } catch (error: any) {
      if (error.response?.status === 409) {
        await fetchData();
      } else {
        alert("Erro ao processar solicitação.");
      }
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ height: { xs: 120, sm: 150 }, bgcolor: '#CFD9DE' }} />

      <Box sx={{ px: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: { xs: '-40px', sm: '-50px' }, alignItems: 'flex-end' }}>
          <Avatar 
            src={user?.imageUrl} 
            sx={{ 
              width: { xs: 80, sm: 100 }, 
              height: { xs: 80, sm: 100 }, 
              border: '4px solid white', 
              bgcolor: '#1d9bf0' 
            }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>
          
          {!isMyProfile && (
            <Button 
              variant={isFollowing ? "outlined" : "contained"} 
              onClick={toggleFollow} 
              sx={{ 
                borderRadius: 20, 
                fontWeight: 'bold', 
                textTransform: 'none',
                height: '36px',
                bgcolor: isFollowing ? 'transparent' : 'black',
                color: isFollowing ? 'black' : 'white',
                border: isFollowing ? '1px solid #cfd9de' : 'none',
                '&:hover': {
                  bgcolor: isFollowing ? '#fee7e7' : '#333',
                  borderColor: isFollowing ? 'red' : 'none',
                  color: isFollowing ? 'red' : 'white',
                }
              }}
            >
              {isFollowing ? "Seguindo" : "Seguir"}
            </Button>
          )}
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
          {user?.name}
        </Typography>
        <Typography color="textSecondary">@{user?.username}</Typography>

        <Typography variant="body2" sx={{ mt: 2 }}>
          <strong>{user?.followers?.length || 0}</strong> Seguidores · <strong>{user?.following?.length || 0}</strong> Seguindo
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ width: '100%' }}>
        {tweets.length > 0 ? (
          tweets.map(t => (
            <TweetCard 
              key={t.id} 
              tweet={t} 
              onUpdate={fetchData} 
            />
          ))
        ) : (
          <Typography sx={{ p: 4, textAlign: 'center', color: 'gray' }}>Nenhum tweet ainda.</Typography>
        )}
      </Box>
    </Box>
  );
};