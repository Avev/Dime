import axios from 'axios';
import { utilService } from './utilService';

export const itemService = {
  query,
  querySortByDate,
  querySortByLocation,
  add,
  uploadItemImage,
  deleteItem
};

const BASE_URL = 'api/item';

//LIST ITEMS
async function query(filter = {}, sort = '') {
  const res = await axios.get(`http://localhost:3030/${BASE_URL}`, {
    params: filter,
  });
  return res.data;
}

//LIST ITEMS sorted by date
async function querySortByDate() {
  const res = await axios.get(`http://localhost:3030/${BASE_URL}/sortByDate`);
  return res.data;
}

//LIST ITEMS sorted by location
async function querySortByLocation() {
  const res = await axios.get(
    `http://localhost:3030/${BASE_URL}/sortByLocation`
  );
  return res.data;
}

//CREATE ITEM
async function add(item) {
  const { image, ...itemJSON } = item;
  const json = JSON.stringify(itemJSON);
  const data = new FormData();
  data.append('document', json);
  data.append('image', image);
  const res = await axios.post(`http://localhost:3030/${BASE_URL}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
}

async function deleteItem(itemId) {
  await axios.delete(`http://localhost:3030/${BASE_URL}/${itemId}`);
}

async function uploadItemImage(imageFormData) {
  return utilService.uploadFile(
    `http://localhost:3030/${BASE_URL}/image`,
    imageFormData
  );
}
/* 
  CRUDL

  CREATE
  UPDATE
  READ
  DELETE
  LIST
*/
