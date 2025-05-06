import { useBookContext } from '../context/BookContext';

const ReadBooks = () => {
    const { readBooks, markAsUnread } = useBookContext();

    return (
        <div className="mb-4 p-4 border rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">Libros Leídos</h2>
            {readBooks.length === 0 ? (
                <p>No has leído ningún libro aún.</p>
            ) : (
                <ul>
                    {readBooks.map(book => (
                        <li key={book.id} className="mb-2 p-2 border-b flex items-center justify-between">
                            <div className="flex-grow">
                                <strong className="block">{book.title}</strong>
                                <span className="text-gray-600 text-sm">Por {book.author} ({book.genre}, {book.year})</span>
                            </div>
                            <button onClick={() => markAsUnread(book.id)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline text-sm">Marcar como No Leído</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReadBooks;