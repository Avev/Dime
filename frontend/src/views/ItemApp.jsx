import { useEffect, useState } from 'react';
import ItemFilter from '../cmps/ItemFilter';
import ItemList from '../cmps/ItemList';
import { itemService } from '../services/itemService';
import ItemSort from '../cmps/ItemSort';
import { Box } from '@mui/system';
import { PageContainer } from '../cmps/layout-cmps/PageContainer';

const ItemApp = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async (filterBy, sortBy) => {
    const items = await itemService.query(filterBy, sortBy);
    setItems(items);
  };

  const onFilter = (filter) => {
    fetchItems(filter);
  };

  const onSort = (sort) => {
    const { value, isAsc } = sort;
    const itemsCopy = [...items];
    const sortedItems = itemsCopy.sort((i1, i2) => {
      return isAsc
        ? i1[value].localeCompare(i2[value])
        : i2[value].localeCompare(i1[value]);
    });
    setItems(sortedItems);
  };


  return (
    <PageContainer>
      <TopBar
        itemFilterProps={{
          onFilter,
          debounce: true,
        }}
        itemSortProps={{
          onSort,
        }}
      />
      <ItemList items={items} />
    </PageContainer>
  );
};

const TopBar = ({ itemFilterProps, itemSortProps }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <ItemFilter {...itemFilterProps} />
      <ItemSort {...itemSortProps} />
    </Box>
  );
};
export default ItemApp;
