import axios from 'axios';

export const authService = {
  updateViewedListings,
};

const BASE_URL = 'auth';

async function updateViewedListings(bodyData) {
  return axios.put(
    `http://localhost:3030/${BASE_URL}/viewed_update`,
    bodyData
  );
}
