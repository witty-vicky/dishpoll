"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [dishes, setDishes] = useState([]);
    const [votesByUser, setVotesByUser] = useState({});

    useEffect(() => {
        fetch("https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json")
            .then(res => res.json())
            .then(setDishes);
    }, []);

    return (
        <AppContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                dishes,
                votesByUser,
                setVotesByUser,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export const useApp = () => useContext(AppContext);
