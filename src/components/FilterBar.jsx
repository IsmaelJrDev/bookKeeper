// src/components/FilterBar.jsx
import { useState, useCallback } from 'react';
import { useBookContext } from '../context/BookContext';

const FilterBar = () => {
    const { setBooks, books: allBooks } = useBookContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('title');

    const handleFilter = useCallback(() => {
        if (!searchTerm) {
            setBooks(allBooks);
            return;
        }

        const filteredBooks = allBooks.filter(book => {
            const term = searchTerm.toLowerCase();
            if (filterType === 'title') {
                return book.title.toLowerCase().includes(term);
            } else if (filterType === 'author') {
                return book.author.toLowerCase().includes(term);
            } else if (filterType === 'genre') {
                return book.genre.toLowerCase().includes(term);
            }
            return true;
        });
        setBooks(filteredBooks);
    }, [searchTerm, filterType, allBooks, setBooks]);

    return (
        <div className="mb-4 p-4 border rounded shadow-md flex items-center space-x-4">
            <label htmlFor="filterType" className="text-gray-700 text-sm font-bold">Filtrar por:</label>
            <select id="filterType" value={filterType} onChange={(e) => setFilterType(e.target.value)} className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm">
                <option value="title">Título</option>
                <option value="author">Autor</option>
                <option value="genre">Género</option>
            </select>
            <input type="text" placeholder={`Buscar por ${filterType}`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" />
            <button onClick={handleFilter} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm">Buscar</button>
        </div>
    );
};

export default FilterBar;