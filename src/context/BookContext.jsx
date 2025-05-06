import { createContext, useState, useContext } from 'react';

const BookContext = createContext();

export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [readBooks, setReadBooks] = useState([]);

    const addBook = (book) => {
        setBooks([...books, { ...book, id: Date.now() }]);
    };

    const updateBook = (id, updatedBook) => {
        setBooks(books.map(book => (book.id === id ? { ...book, ...updatedBook } : book)));
    };

    const deleteBook = (id) => {
        setBooks(books.filter(book => book.id !== id));
        setReadBooks(readBooks.filter(book => book.id !== id));
    };

    const markAsRead = (id) => {
        const bookToMark = books.find(book => book.id === id);
        if (bookToMark && !readBooks.some(book => book.id === id)) {
            setReadBooks([...readBooks, { ...bookToMark, isRead: true }]);
            setBooks(books.filter(book => book.id !== id));
        }
    };

    const markAsUnread = (id) => {
        const bookToUnmark = readBooks.find(book => book.id === id);
        if (bookToUnmark) {
            setBooks([...books, { ...bookToUnmark, isRead: false }]);
            setReadBooks(readBooks.filter(book => book.id !== id));
        }
    };

    return (
        <BookContext.Provider
            value={{
                books,
                readBooks,
                addBook,
                updateBook,
                deleteBook,
                markAsRead,
                markAsUnread,
                setBooks, // Para el hook personalizado
                setReadBooks, // Para el hook personalizado
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