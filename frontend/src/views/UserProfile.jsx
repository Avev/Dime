import React, { useEffect, useState } from 'react';
import { PageContainer } from '../cmps/layout-cmps/PageContainer';
import { userService } from '../services/userService';

const UserProfile = ({}) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const user = await userService.getLoggedInUser();
    setUser(user);
  };

  return (
    <PageContainer>
      Hello from Profile
      <button
        onClick={() => {
          userService.getLoggedInUser();
        }}>
        google login
      </button>
    </PageContainer>
  );
};

export default UserProfile;
