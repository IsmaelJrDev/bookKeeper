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
        <form onSubmit={handleSubmit} className="card">
            <h2 className="card-header">Agregar Nuevo Libro</h2>
            <div className="card-content">
                <label htmlFor="title">Título:</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="card-content">
                <label htmlFor="author">Autor:</label>
                <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </div>
            <div className="card-content">
                <label htmlFor="genre">Género:</label>
                <input type="text" id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
            </div>
            <div className="card-content">
                <label htmlFor="year">Año de Publicación:</label>
                <input type="number" id="year" value={year} onChange={(e) => setYear(e.target.value)} />
            </div>
            <button type="submit" className="button">Agregar Libro</button>
        </form>
    );
};

export default BookForm;