import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Redirect } from 'react-router-dom';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { PageContainer } from '../cmps/layout-cmps/PageContainer';
import UserItemList from '../cmps/UserItemList';
import { itemService } from '../services/itemService';

const UserProfile = ({ user }) => {
  const [userItems, setUserItems] = useState([]);

  useEffect(() => {
    fetchUserItems();
  }, []);

  const fetchUserItems = async () => {
    const items = await itemService.query({ userId: user?._id });
    setUserItems(items);
  };

  const onDeleteItem = (itemId) => {
    itemService.deleteItem(itemId);
    setUserItems((prevItems) => prevItems.filter((i) => i._id !== itemId));
  };

  return (
    <PageContainer>
      <Title username={user?.username} />

      <UserItemTitle />
      {!!userItems.length && (
        <UserItemList items={userItems} onDeleteItem={onDeleteItem} />
      )}
    </PageContainer>
  );
};

const Title = ({ username }) => {
  const theme = useTheme();

  return (
    <Typography
      variant='h4'
      sx={{
        marginBottom: '40px',
        borderBottom: `1px solid ${theme.palette.secondary.main}`,
      }}>
      Hello, {username}
    </Typography>
  );
};

const UserItemTitle = () => {
  return <Typography variant='h5' sx={{marginBottom: '15px'}}>Items you posted:</Typography>;
};
export default UserProfile;
