import { useBookContext } from '../context/BookContext';
import BookItem from './BookItem';

const BookList = () => {
    const { books } = useBookContext();

    return (
        <div className="card">
            <h2 className="card-header">Lista de Libros</h2>
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