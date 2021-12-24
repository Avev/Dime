import axios from 'axios';

export const itemService = { query, querySortByDate, querySortByLocation, add };

const BASE_URL = 'api/item';

//LIST ITEMS
async function query() {
  const res = await axios.get(`http://localhost:3030/${BASE_URL}`);
  return res.data;
}

//LIST ITEMS sorted by date
async function querySortByDate() {
  const res = await axios.get(`http://localhost:3030/${BASE_URL}/sortByDate`);
  return res.data;
}

//LIST ITEMS sorted by location
async function querySortByLocation() {
  const res = await axios.get(`http://localhost:3030/${BASE_URL}/sortByLocation`);
  return res.data;
}

//CREATE ITEM
async function add(item) {
  const res = await axios.post(`http://localhost:3030/${BASE_URL}`, item);
  return res.data;
}
/* 
  CRUDL

  CREATE
  UPDATE
  READ
  DELETE
  LIST
*/
