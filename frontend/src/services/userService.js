import axios from 'axios';

export const userService = {
  getLoggedInUser,
};

const BASE_URL = 'api/user';
/* 
[
    {
        uid: string;
        username: string;
        itemsPosted: [
            {

            }
        ];
        itemsLiked: Item[];
        isAdmin: boolean;
    }
]
*/

async function getLoggedInUser() {
  //   const userId = 'test123';
  //   const res = await axios.get(`http://localhost:3030/${BASE_URL}/${userId}`);
  const res = await axios.get(`http://localhost:3030/auth/google`);
  return res.data;
}

async function getUser(userId) {
  const res = await axios.get(`http://localhost:3030/${BASE_URL}/${userId}`);
  return res.data;
}
