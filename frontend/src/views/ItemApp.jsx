import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import ItemFilter from '../cmps/ItemFilter';
import ItemList from '../cmps/ItemList';
import { itemService } from '../services/itemService';
import ItemSort from '../cmps/ItemSort';
import { Box } from '@mui/system';

const ItemApp = ({ sortBy }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // if (sortBy === 'date') {
    //   fetchItemsSortByDate();
    // } else if (sortBy === 'location') {
    //   fetchItemsSortByLocation();
    // } else {
    //   fetchItems();
    // }
  }, []);

  const fetchItems = async (filterBy) => {
    const items = await itemService.query(filterBy);
    setItems(items);
  };

  const fetchItemsSortByDate = async () => {
    const items = await itemService.querySortByDate();
    setItems(items);
  };

  const fetchItemsSortByLocation = async () => {
    const items = await itemService.querySortByLocation();
    setItems(items);
  };

  const onFilter = (filter) => {
    fetchItems(filter);
  };

  return (
    <Container maxWidth='xl'>
      <TopBar
        itemFilterProps={{
          onFilter,
          debounce: true,
        }}
      />
      <ItemList items={items} />
    </Container>
  );
};
const TopBar = ({ itemFilterProps }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <ItemFilter {...itemFilterProps} />
      <ItemSort />
    </Box>
  );
};
export default ItemApp;
