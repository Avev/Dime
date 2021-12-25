import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import ItemFilter from '../cmps/ItemFilter';
import ItemList from '../cmps/ItemList';
import { itemService } from '../services/itemService';
import SelectSort from "../cmps/SelectSort";
import SelectCategory from "../cmps/SelectCategory";


const ItemApp = ({sortBy}) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
      if (sortBy === 'date') {
          fetchItemsSortByDate()
      }
      else if (sortBy === 'location') {
          fetchItemsSortByLocation()
      }
      else {
          fetchItems();
      }
  }, []);

  const fetchItems = async () => {
    const items = await itemService.query();
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

  return (
    <Container maxWidth='xl'>
      <ItemFilter />
      <SelectCategory />
      <SelectSort
          // onChange={}
      />
      <ItemList items={items} />
    </Container>
  );
};

export default ItemApp;
