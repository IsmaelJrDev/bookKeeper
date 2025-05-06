import { useBookContext } from '../context/BookContext';

const BookList = () => {
    const { books, deleteBook, updateBook, markAsRead } = useBookContext();

    return (
        <div className="card">
            <h2 className="card-header">Lista de Libros</h2>
            {books.length === 0 ? (
                <p>No hay libros registrados.</p>
            ) : (
                <ul>
                    {books.map((book) => (
                        <li key={book.id}>
                            <div>
                                <strong>{book.title}</strong>
                                <p>{book.author} - {book.genre} ({book.year})</p>
                            </div>
                            <div className="book-actions">
                                <button
                                    className="button-edit"
                                    onClick={() => updateBook(book.id, { title: 'Nuevo Título' })}
                                >
                                    Editar
                                </button>
                                <button
                                    className="button-delete"
                                    onClick={() => deleteBook(book.id)}
                                >
                                    Eliminar
                                </button>
                                <button
                                    className="button-read"
                                    onClick={() => markAsRead(book.id)}
                                >
                                    Marcar como Leído
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BookList;