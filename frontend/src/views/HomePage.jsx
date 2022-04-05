import { Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { PageContainer } from '../cmps/layout-cmps/PageContainer';
import UserRecommendedItems from '../cmps/UserItemList'
import { UserContext } from '../lib/context/UserContext';
import { itemService } from '../services/itemService';
import classes from '../assets/styles/cmps/HomePage.module.css';

const HomePage = ({ }) => {

  const { user } = useContext(UserContext);
  const [recommendedItemsByContacts, setRecommendedItemsByContacts] = useState([]);
  const [recommendedItemsByEmail, setRecommendedItemsByEmail] = useState([]);
  const [recommendedItemsByFriendsPosted, setRecommendedItemsByFriendsPosted] = useState([]);
  const [recommendedItemsByPosted, setRecommendedItemsByPosted] = useState([]);

  useEffect(() => {
    if (user?.recommended_from_friends?.length) {
      fetchItems();
    }
  }, [user])

  const fetchItems = async () => {
    const recommendedItemsByEmailPrm = itemService.query({ itemIds: user.recommended_from_email });
    const recommendedItemsByContactsPrm = itemService.query({ itemIds: user.recommended_from_friends });
    const recommendedItemsByFriendsPosted = itemService.query({ itemIds: user.friends_listings });
    const recommendedItemsByUserViewed = itemService.query({ itemIds: user.recommended_from_viewed_listings });

    try {
      const allRecommendedItemsArray = await Promise.all([
        recommendedItemsByContactsPrm,
        recommendedItemsByEmailPrm,
        recommendedItemsByFriendsPosted,
        recommendedItemsByUserViewed
      ])

      setRecommendedItemsByContacts(allRecommendedItemsArray[0]);
      setRecommendedItemsByEmail(allRecommendedItemsArray[1]);
      setRecommendedItemsByFriendsPosted(allRecommendedItemsArray[2]);
      setRecommendedItemsByPosted(allRecommendedItemsArray[3]);
    } catch (err) {
      console.error('err: ', err)
    }
  }


  return <PageContainer>
    {user && <ul className={classes.groupContainer}>
      <div>
        <RecommendedItemsByEmailTitle />
        <RecommendedItems items={recommendedItemsByEmail} />
      </div>
      <div>
        <RecommendedItemsByContactsTitle />
        <RecommendedItems items={recommendedItemsByContacts} />
      </div>
      <div>
        <RecommendedItemsByFriendsPostedTitle />
        <RecommendedItems items={recommendedItemsByFriendsPosted} />
      </div>
      <div>
        <RecommendedItemsByUserViewedTitle />
        <RecommendedItems items={recommendedItemsByPosted} />
      </div>
    </ul>}
    {!user && <div>
      <Typography variant='h4'>
        Login for recommendations...
      </Typography>
    </div>}
  </PageContainer>;
};



const RecommendedItems = ({ items }) => {
  return <UserRecommendedItems items={items} />
}

const RecommendedItemsByEmailTitle = () => {
  return <Typography variant='h5' sx={{ marginBottom: '15px' }}>Recommened items by your email digest:</Typography>;
};
const RecommendedItemsByContactsTitle = () => {
  return <Typography variant='h5' sx={{ marginBottom: '15px' }}>Top items your friends viewed:</Typography>;
};
const RecommendedItemsByFriendsPostedTitle = () => {
  return <Typography variant='h5' sx={{ marginBottom: '15px' }}>Here are the items your friends posted:</Typography>;
};
const RecommendedItemsByUserViewedTitle = () => {
  return <Typography variant='h5' sx={{ marginBottom: '15px' }}>Your most viewed items:</Typography>;
};

export default HomePage;
