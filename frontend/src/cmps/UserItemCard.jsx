import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ItemDetails from './ItemDetails';

export default function UserItemCard({ item, onDeleteItem }) {
  return (
    <Card sx={{ minWidth: 300 }}>
      <CardMedia
        component='img'
        height='140'
        image={window.location.origin + '/images/' + item.image}
        alt={item.title}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {item.title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small' onClick={onDeleteItem}>
          Delete
        </Button>
        <ItemDetails item={item} />
      </CardActions>
    </Card>
  );
}
