import Stack from '@mui/material/Stack';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { utilService } from '../services/utilService';
import ItemDetails from './ItemDetails';

const ItemList = ({ items }) => {
  return (
    <Stack>
      {items.map((item) => (
        <ActionAreaCard key={item._id} item={item} />
      ))}
    </Stack>
  );
};

// Code taken from MUI.. imgUrl is just temporary, until we have actual images for each product.
function ActionAreaCard({ item }) {
  const imgUrl = React.useMemo(
    () =>
      `https://picsum.photos/id/${utilService.getRandomInt(100, 1000)}/200/300`,
    []
  );
  return (
    <Card sx={{ maxWidth: '100%', my: 2 }}>
      <div
        onClick={() => {
          console.log('card got clicked');
        }}>
        <ItemDetails item={item} />
        <CardActionArea
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: { sm: 'space-between' },
          }}>
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {item.title}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {item.category}, {item.location}
              {/*Lizards are a widespread group of squamate reptiles, with over 6,000*/}
              {/*species, ranging across all continents except Antarctica*/}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {item.description}
              {/*Lizards are a widespread group of squamate reptiles, with over 6,000*/}
              {/*species, ranging across all continents except Antarctica*/}
            </Typography>
          </CardContent>
          <CardMedia
            component='img'
            sx={{
              width: { xs: '100%', sm: 200 },
              order: { xs: '-1', sm: '0' },
            }}
            height='160'
            image={window.location.origin + '/images/' + item.image}
            alt={item.image}
          />
        </CardActionArea>
      </div>
    </Card>
  );
}

export default ItemList;
