"use client"
import { off, onValue, ref } from 'firebase/database';
import { createContext, useEffect, useState } from 'react';
import { db } from '../../firebase.config';
export const userContext = createContext();
export const UserProvider = ({ children }) => {

    const [userData, setUserData] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (!userId) return;
        const usersRef = ref(db, `/users/${userId}`);

        onValue(usersRef, (snapshot) => {
            if (snapshot.exists()) {
                setUserData(snapshot.val());
            } else {
                setUserData([]);
            }
        });

        return () => {
            off(usersRef);
        };
    }, [userId]);

    return (
        <userContext.Provider value={{ userData, setUserData, userId, setUserId }}>
            {children}
        </userContext.Provider>
    );
};