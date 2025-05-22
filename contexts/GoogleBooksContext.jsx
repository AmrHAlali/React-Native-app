import { createContext, useEffect, useState } from "react";
import { client } from "../lib/appwrite";
import { useUser } from '../hooks/useUser';

export const GoogleBooksContext = createContext();

export function GoogleBooksProvider({ children }) {
    const [books, setBooks] = useState([]);
    const [book, setBook] = useState(null);
    const { user } = useUser();

    async function searchBooks(query) {
    try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        const items = data?.items || [];
        setBooks(items);
        console.log("Fetched books:", items);
    } catch (error) {
        console.error("Error searching books:", error);
    }
}

async function fetchBookById(id) {
    try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${encodeURIComponent(id)}`);
        const data = await res.json();
        setBook(data);
        console.log("Fetched book by ID:", data);
        return data;
    } catch (error) {
        console.error("Error fetching book by ID:", error);
        return null;
    }
}


    useEffect(() => {
        if (!user) {
            setBooks([]);
        }
    }, [user]);

    return (
        <GoogleBooksContext.Provider value={{ books, book, searchBooks, fetchBookById }}>
            {children}
        </GoogleBooksContext.Provider>
    );
}
