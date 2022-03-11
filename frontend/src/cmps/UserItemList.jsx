import Stack from '@mui/material/Stack';
import UserItemCard from './UserItemCard';

const UserItemList = ({ items, onDeleteItem }) => {
  return (
    <Stack
      sx={{
        flexDirection: 'row',
        gap: '20px',
        width: '100%',
        overflowX: 'scroll',
        
      }}>
      {items.map((item) => (
        <UserItemCard
          key={item._id}
          item={item}
          onDeleteItem={() => onDeleteItem(item._id)}
        />
      ))}
    </Stack>
  );
};

export default UserItemList;
