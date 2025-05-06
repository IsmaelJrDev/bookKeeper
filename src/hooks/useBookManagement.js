import { useState, useEffect } from 'react';
import { useBookContext } from '../context/BookContext';

const LOCAL_STORAGE_KEY = 'bookAppBooks';
const LOCAL_STORAGE_READ_KEY = 'bookAppReadBooks';

const useBookManagement = () => {
    const { books, setBooks, readBooks, setReadBooks } = useBookContext();

    useEffect(() => {
        const storedBooks = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedBooks) {
            setBooks(JSON.parse(storedBooks));
        }

        const storedReadBooks = localStorage.getItem(LOCAL_STORAGE_READ_KEY);
        if (storedReadBooks) {
            setReadBooks(JSON.parse(storedReadBooks));
        }
    }, [setBooks, setReadBooks]);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
    }, [books]);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_READ_KEY, JSON.stringify(readBooks));
    }, [readBooks]);

    return { books, readBooks }; // Devolvemos los estados para que los componentes los utilicen del contexto
};

export default useBookManagement;