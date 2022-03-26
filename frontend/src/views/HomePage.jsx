import { Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { PageContainer } from '../cmps/layout-cmps/PageContainer';
import RecommendedItems from '../cmps/UserItemList'
import { UserContext } from '../lib/context/UserContext';
import { itemService } from '../services/itemService';
const HomePage = ({ }) => {
  const { user } = useContext(UserContext);
  const [recommendedItemsByContacts, setRecommendedItemsByContacts] = useState([])

  useEffect(() => {
    if (user?.recommended_from_friends?.length) {
      fetchItems();
    }
  }, [user])

  const fetchItems = async () => {
    const recommendedItemsByContacts = await itemService.query({ itemIds: user.recommended_from_friends });
    setRecommendedItemsByContacts(recommendedItemsByContacts);
  }

  return <PageContainer>
    <RecommendedItemsByContactsTitle />
    <RecommendedItemsByContacts items={recommendedItemsByContacts} />
  </PageContainer>;
};

const RecommendedItemsByContacts = ({ items }) => {
  return <RecommendedItems items={items} />
}

const RecommendedItemsByContactsTitle = () => {
  return <Typography variant='h5' sx={{ marginBottom: '15px' }}>Top items your friends viewed:</Typography>;
};

export default HomePage;
