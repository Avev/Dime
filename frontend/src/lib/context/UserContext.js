import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { userService } from '../../services/userService';

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    if (!user) {
      const user = await userService.getLoggedInUser();
      setUser(user);
    } else {
        
    }
  };

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
