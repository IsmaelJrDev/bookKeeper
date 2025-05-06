// src/components/BookForm.jsx
import { useState } from 'react';
import { useBookContext } from '../context/BookContext';

const BookForm = () => {
    const { addBook } = useBookContext();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && author && genre && year) {
            addBook({ title, author, genre, year: parseInt(year) });
            setTitle('');
            setAuthor('');
            setGenre('');
            setYear('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">Agregar Nuevo Libro</h2>
            <div className="mb-2">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-1">Título:</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-2">
                <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-1">Autor:</label>
                <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-2">
                <label htmlFor="genre" className="block text-gray-700 text-sm font-bold mb-1">Género:</label>
                <input type="text" id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-2">
                <label htmlFor="year" className="block text-gray-700 text-sm font-bold mb-1">Año de Publicación:</label>
                <input type="number" id="year" value={year} onChange={(e) => setYear(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Agregar Libro</button>
        </form>
    );
};

export default BookForm;