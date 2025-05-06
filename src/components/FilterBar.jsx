import { useState, useCallback } from 'react';
import { useBookContext } from '../context/BookContext';

const FilterBar = () => {
    const { setBooks, allBooks } = useBookContext(); // Usamos allBooks como referencia
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('title');

    const handleFilter = useCallback(() => {
        if (!searchTerm.trim()) {
            // Si no hay término de búsqueda, muestra todos los libros
            setBooks(allBooks);
            return;
        }

        const term = searchTerm.toLowerCase();
        const filteredBooks = allBooks.filter(book => {
            if (filterType === 'title') {
                return book.title.toLowerCase().includes(term);
            } else if (filterType === 'author') {
                return book.author.toLowerCase().includes(term);
            } else if (filterType === 'genre') {
                return book.genre.toLowerCase().includes(term);
            }
            return false;
        });

        setBooks(filteredBooks);
    }, [searchTerm, filterType, allBooks, setBooks]);

    const handleShowAll = () => {
        // Restablece la lista de libros visibles a la lista completa
        setBooks(allBooks);
        setSearchTerm(''); // Limpia el término de búsqueda
    };

    return (
        <div className="card flex">
            <label htmlFor="filterType">Filtrar por:</label>
            <select
                id="filterType"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
            >
                <option value="title">Título</option>
                <option value="author">Autor</option>
                <option value="genre">Género</option>
            </select>
            <input
                type="text"
                placeholder={`Buscar por ${filterType}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleFilter} className="button">Buscar</button>
            <button onClick={handleShowAll} className="button-secondary">Mostrar Todo</button>
        </div>
    );
};

export default FilterBar;