"use client"
import { createContext, useEffect, useState } from 'react';
import { off, onValue, ref } from 'firebase/database';
import { db } from '../../firebase.config';

export const eventsDataContext = createContext();
export const EventsDataProvider = ({ children }) => {

    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const activitiesRef = ref(db, "/activities");

        onValue(activitiesRef, (snapshot) => {
            if (snapshot.exists()) {
                setActivities(snapshot.val());
            } else {
                setActivities([]);
            }
        });

        return () => {
            off(activitiesRef);
        };
    }, []);

    return (
        <eventsDataContext.Provider value={{ activities }}>
            {children}
        </eventsDataContext.Provider>
    );
};