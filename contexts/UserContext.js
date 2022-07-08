import { getCookie, hasCookie } from 'cookies-next';
import { createContext, useContext, useEffect, useState } from 'react';

export const UserContext = createContext(null);

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children, value }) => {
    const [user, setUser] = useState({ value: null });

    useEffect(() => {
        if (hasCookie('bearer_token')) {
            setUser({
                value: getCookie('bearer_token'),
            });
        }
    }, []);

    return <UserContext.Provider value={{ user, setUser, ...value }}>{children}</UserContext.Provider>;
};
