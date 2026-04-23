import { Box, Typography, Divider, List, ListItem} from '@mui/material';

const TRENDS = [
  { category: 'Tecnologia · Assunto do Momento', title: '#ReactJS', posts: '125K posts' },
  { category: 'Esportes · Assunto do Momento', title: 'Futebol Brasileiro', posts: '85K posts' },
  { category: 'Entretenimento · Assunto do Momento', title: 'Novo Filme da Marvel', posts: '210K posts' },
];

export const Explore = () => {
  return (
    <Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{fontWeight:"bold"}}>Explorar</Typography>
      </Box>
      <Divider />
      <List>
        {TRENDS.map((trend, index) => (
          <ListItem key={index} divider sx={{ flexDirection: 'column', alignItems: 'flex-start', py: 2, cursor: 'pointer', '&:hover': { bgcolor: '#f5f5f5' } }}>
            <Typography variant="caption" color="textSecondary">{trend.category}</Typography>
            <Typography variant="body1" sx={{fontWeight:"bold"}}>{trend.title}</Typography>
            <Typography variant="caption" color="textSecondary">{trend.posts}</Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};