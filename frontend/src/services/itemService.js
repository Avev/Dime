import axios from 'axios';

export const itemService = { query, add };

const BASE_URL = 'api/item';

//LIST ITEMS
async function query() {
  const res = await axios.get(`http://localhost:3030/${BASE_URL}`);
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
