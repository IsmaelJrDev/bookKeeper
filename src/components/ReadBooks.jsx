import { useBookContext } from '../context/BookContext';

const ReadBooks = () => {
    const { readBooks, markAsUnread } = useBookContext();

    return (
        <div className="card">
            <h2 className="card-header">Libros Leídos</h2>
            {readBooks.length === 0 ? (
                <p>No has leído ningún libro aún.</p>
            ) : (
                <ul>
                    {readBooks.map(book => (
                        <li key={book.id} className="card-content flex">
                            <div className="flex-grow">
                                <strong>{book.title}</strong>
                                <span>Por {book.author} ({book.genre}, {book.year})</span>
                            </div>
                            <button onClick={() => markAsUnread(book.id)} className="button-secondary">Marcar como No Leído</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReadBooks;