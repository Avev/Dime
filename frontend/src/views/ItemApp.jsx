import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import ItemFilter from '../cmps/ItemFilter';
import ItemList from '../cmps/ItemList';
import { itemService } from '../services/itemService';

const ItemApp = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const items = await itemService.query();
    setItems(items);
  };

  return (
    <Container maxWidth='xl'>
      <ItemFilter />
      <ItemList items={items} />
    </Container>
  );
};

export default ItemApp;
