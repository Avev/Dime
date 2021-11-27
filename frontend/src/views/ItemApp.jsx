import { useEffect, useState } from 'react';
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
    <div className='container'>
      <h1>Hello from Item App</h1>
      <ItemList items={items} />
    </div>
  );
};

export default ItemApp;
