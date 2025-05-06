// src/components/BookList.jsx
import { useBookContext } from '../context/BookContext';
import BookItem from './BookItem';

const BookList = () => {
    const { books } = useBookContext();

    return (
        <div className="mb-4 p-4 border rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">Lista de Libros</h2>
            {books.length === 0 ? (
                <p>No hay libros registrados.</p>
            ) : (
                <ul>
                    {books.map(book => (
                        <BookItem key={book.id} book={book} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BookList;