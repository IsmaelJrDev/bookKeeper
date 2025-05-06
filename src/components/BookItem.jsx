// src/components/BookItem.jsx
import { useBookContext } from '../context/BookContext';
import { useState } from 'react';

const BookItem = ({ book }) => {
    const { deleteBook, markAsRead, updateBook } = useBookContext();
    const [isEditing, setIsEditing] = useState(false);
    const [editedBook, setEditedBook] = useState({ ...book });

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        updateBook(book.id, editedBook);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedBook(prev => ({ ...prev, [name]: value }));
    };

    return (
        <li className="mb-2 p-2 border-b flex items-center justify-between">
            {isEditing ? (
                <div className="flex-grow">
                    <input type="text" name="title" value={editedBook.title} onChange={handleChange} className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" />
                    <input type="text" name="author" value={editedBook.author} onChange={handleChange} className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm mt-1" />
                    <input type="text" name="genre" value={editedBook.genre} onChange={handleChange} className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm mt-1" />
                    <input type="number" name="year" value={editedBook.year} onChange={handleChange} className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm mt-1" />
                </div>
            ) : (
                <div className="flex-grow">
                    <strong className="block">{book.title}</strong>
                    <span className="text-gray-600 text-sm">Por {book.author} ({book.genre}, {book.year})</span>
                </div>
            )}
            <div>
                {isEditing ? (
                    <>
                        <button onClick={handleSave} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2 text-sm">Guardar</button>
                        <button onClick={() => setIsEditing(false)} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline text-sm">Cancelar</button>
                    </>
                ) : (
                    <>
                        <button onClick={handleEdit} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2 text-sm">Editar</button>
                        <button onClick={() => deleteBook(book.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2 text-sm">Eliminar</button>
                        <button onClick={() => markAsRead(book.id)} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline text-sm">Marcar como Leído</button>
                    </>
                )}
            </div>
        </li>
    );
};

export default BookItem;