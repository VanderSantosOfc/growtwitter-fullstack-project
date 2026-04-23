import { useState } from 'react';
import { Box, Typography, Avatar, IconButton } from '@mui/material';
import { 
  Favorite, 
  FavoriteBorder, 
  DeleteOutlined, 
  ChatBubbleOutlined 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { tweetService } from '../../services/tweetService';
import { ReplyModal } from '../ReplyModal';

export const TweetCard = ({ tweet, onUpdate }: { tweet: any; onUpdate: () => void }) => {
  const navigate = useNavigate();
  const [openReply, setOpenReply] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  
  const currentUserId = user?.id || user?._id;
  const isLiked = tweet.likes?.some((l: any) => l.authorId === currentUserId);

  const handleGoToProfile = () => {
    navigate(`/profile/${tweet.author?.id}`);
  };

  return (
    <Box sx={{ borderBottom: '1px solid #EFF3F4' }}>
      <Box sx={{ p: 2, display: 'flex' }}>
        <Avatar 
          src={tweet.author?.imageUrl} 
          sx={{ mr: 2, cursor: 'pointer' }} 
          onClick={handleGoToProfile} 
        >
          {tweet.author?.name?.charAt(0).toUpperCase()}
        </Avatar>

        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 0.5, cursor: 'pointer' }} onClick={handleGoToProfile}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              {tweet.author?.name}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              @{tweet.author?.username}
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ mb: 1, whiteSpace: 'pre-wrap' }}>
            {tweet.content}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton size="small" onClick={() => setOpenReply(true)}>
                <ChatBubbleOutlined sx={{ fontSize: 18 }} />
              </IconButton>
              <Typography variant="caption">{tweet.replies?.length || 0}</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton size="small" onClick={async () => {
                isLiked ? await tweetService.dislike(tweet.id) : await tweetService.like(tweet.id);
                onUpdate();
              }}>
                {isLiked ? <Favorite sx={{ color: '#F91880', fontSize: 18 }} /> : <FavoriteBorder sx={{ fontSize: 18 }} />}
              </IconButton>
              <Typography variant="caption">{tweet.likes?.length || 0}</Typography>
            </Box>

            {(currentUserId === tweet.authorId || currentUserId === tweet.author?.id) && (
              <IconButton size="small" sx={{ ml: 'auto' }} onClick={async () => { 
                if(window.confirm("Excluir post?")) { await tweetService.delete(tweet.id); onUpdate(); }
              }}>
                <DeleteOutlined sx={{ fontSize: 18 }} />
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>

      {tweet.replies && tweet.replies.length > 0 && (
        <Box sx={{ 
          ml: 6, 
          borderLeft: '2px solid #EFF3F4', 
          bgcolor: 'rgba(0,0,0,0.01)' 
        }}>
          {tweet.replies.map((reply: any) => (
            <TweetCard 
              key={reply.id} 
              tweet={reply.reply ? reply.reply : reply} 
              onUpdate={onUpdate} 
            />
          ))}
        </Box>
      )}

      {/* MODAL DE RESPOSTA */}
      <ReplyModal 
        open={openReply} 
        handleClose={() => setOpenReply(false)} 
        tweet={tweet} 
        onUpdate={onUpdate} 
      />
    </Box>
  );
};
