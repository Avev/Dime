import axios from 'axios';

export const itemService = { query };

const BASE_URL = 'api/item';

async function query() {
  const res = await axios.get(`http://localhost:3030/${BASE_URL}`);
  return res.data;
}
