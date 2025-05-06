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
        <div className="card flex">
            <label htmlFor="filterType">Filtrar por:</label>
            <select id="filterType" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="title">Título</option>
                <option value="author">Autor</option>
                <option value="genre">Género</option>
            </select>
            <input type="text" placeholder={`Buscar por ${filterType}`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <button onClick={handleFilter} className="button">Buscar</button>
        </div>
    );
};

export default FilterBar;