import { useState } from 'react';
import { 
  Modal, 
  Box, 
  TextField, 
  Button, 
  Typography, 
  IconButton, 
  Avatar, 
  Stack, 
  CircularProgress 
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { tweetService } from '../../services/tweetService';
import type { TweetDto } from '../../types';

interface ReplyModalProps {
  open: boolean;
  handleClose: () => void;
  tweet: TweetDto;
  onUpdate: () => void;
}

export const ReplyModal = ({ open, handleClose, tweet, onUpdate }: ReplyModalProps) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReply = async () => {
    if (!content.trim()) return;
    
    try {
      setLoading(true);
      const res = await tweetService.reply(content, tweet.id);
      
      if (res.success) {
        setContent('');
        handleClose();
        onUpdate(); 
      }
    } catch (error) {
      console.error("Erro ao enviar resposta:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal 
      open={open} 
      onClose={handleClose} 
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box sx={{
        width: { xs: '95%', sm: 600 },
        bgcolor: 'white',
        borderRadius: 4,
        p: 2,
        outline: 'none',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={handleClose} size="small">
            <Close />
          </IconButton>
        </Box>

        <Stack direction="row" spacing={2} sx={{ position: 'relative' }}>

          <Box sx={{ 
            position: 'absolute', 
            left: 20, 
            top: 40, 
            bottom: -10, 
            width: '2px', 
            bgcolor: '#cfd9de',
            zIndex: 0 
          }} />
          
          <Avatar src={tweet.author.imageUrl} sx={{ zIndex: 1 }}>
            {tweet.author.name[0]}
          </Avatar>
          
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              {tweet.author.name} 
              <span style={{ color: 'gray', fontWeight: 'normal', marginLeft: '4px' }}>
                @{tweet.author.username}
              </span>
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5, whiteSpace: 'pre-wrap' }}>
              {tweet.content}
            </Typography>
            <Typography variant="caption" color="primary" sx={{ mt: 1, display: 'block' }}>
              Respondendo a @{tweet.author.username}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Avatar sx={{ bgcolor: '#1d9bf0' }}>R</Avatar> 
          
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="standard"
            placeholder="Postar sua resposta"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            slotProps={{ input: { disableUnderline: true } }}
            sx={{ "& .MuiInputBase-root": { fontSize: '1.2rem' } }}
          />
        </Stack>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, pt: 2, borderTop: '1px solid #eff3f4' }}>
          <Button 
            variant="contained" 
            onClick={handleReply}
            disabled={!content.trim() || loading}
            sx={{ 
              borderRadius: 20, 
              fontWeight: 'bold', 
              textTransform: 'none', 
              px: 3,
              boxShadow: 'none'
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Responder'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
