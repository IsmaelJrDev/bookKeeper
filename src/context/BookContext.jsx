import { createContext, useState, useContext, useEffect } from 'react';

const BookContext = createContext();

export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState(() => {
        const storedBooks = localStorage.getItem('books');
        return storedBooks ? JSON.parse(storedBooks) : [];
    });

    const [allBooks, setAllBooks] = useState(() => {
        const storedAllBooks = localStorage.getItem('allBooks');
        return storedAllBooks ? JSON.parse(storedAllBooks) : [];
    });

    const [readBooks, setReadBooks] = useState(() => {
        const storedReadBooks = localStorage.getItem('readBooks');
        return storedReadBooks ? JSON.parse(storedReadBooks) : [];
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        localStorage.setItem('books', JSON.stringify(books));
    }, [books]);

    useEffect(() => {
        localStorage.setItem('allBooks', JSON.stringify(allBooks));
    }, [allBooks]);

    useEffect(() => {
        localStorage.setItem('readBooks', JSON.stringify(readBooks));
    }, [readBooks]);

    const addBook = (book) => {
        const newBook = { ...book, id: Date.now() };
        setBooks((prevBooks) => [...prevBooks, newBook]);
        setAllBooks((prevAllBooks) => [...prevAllBooks, newBook]);
    };

    const updateBook = (id, updatedBook) => {
        setBooks((prevBooks) =>
            prevBooks.map((book) => (book.id === id ? { ...book, ...updatedBook } : book))
        );
        setAllBooks((prevAllBooks) =>
            prevAllBooks.map((book) => (book.id === id ? { ...book, ...updatedBook } : book))
        );
    };

    const deleteBook = (id) => {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        setAllBooks((prevAllBooks) => prevAllBooks.filter((book) => book.id !== id));
        setReadBooks((prevReadBooks) => prevReadBooks.filter((book) => book.id !== id));
    };

    const markAsRead = (id) => {
        const bookToMark = books.find((book) => book.id === id);
        if (bookToMark && !readBooks.some((book) => book.id === id)) {
            setReadBooks((prevReadBooks) => [...prevReadBooks, { ...bookToMark, isRead: true }]);
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        }
    };

    const markAsUnread = (id) => {
        const bookToUnmark = readBooks.find((book) => book.id === id);
        if (bookToUnmark) {
            setBooks((prevBooks) => [...prevBooks, { ...bookToUnmark, isRead: false }]);
            setReadBooks((prevReadBooks) => prevReadBooks.filter((book) => book.id !== id));
        }
    };

    return (
        <BookContext.Provider
            value={{
                books,
                allBooks,
                readBooks,
                addBook,
                updateBook,
                deleteBook,
                markAsRead,
                markAsUnread,
                setBooks,
                setAllBooks,
                setReadBooks,
                isLoading,
                setIsLoading,
            }}
        >
            {children}
        </BookContext.Provider>
    );
};

export const useBookContext = () => {
    const context = useContext(BookContext);
    if (!context) {
        throw new Error('useBookContext debe ser usado dentro de un BookProvider');
    }
    return context;
};
