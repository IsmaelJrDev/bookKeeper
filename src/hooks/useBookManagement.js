import { useEffect } from 'react';
import { useBookContext } from '../context/BookContext';

const LOCAL_STORAGE_KEY = 'bookAppBooks';
const LOCAL_STORAGE_READ_KEY = 'bookAppReadBooks';

const useBookManagement = () => {
    const { books, setBooks, readBooks, setReadBooks, setAllBooks, setIsLoading } = useBookContext();

    // Cargar libros desde el almacenamiento local al iniciar la aplicación
    useEffect(() => {
        try {
            const storedBooks = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (storedBooks) {
                const parsedBooks = JSON.parse(storedBooks);
                setBooks(parsedBooks);
                setAllBooks(parsedBooks); // Inicializa la lista completa
            }

            const storedReadBooks = localStorage.getItem(LOCAL_STORAGE_READ_KEY);
            if (storedReadBooks) {
                setReadBooks(JSON.parse(storedReadBooks));
            }

            // Marcar como cargado
            setIsLoading(false);
        } catch (error) {
            console.error('Error al cargar los datos del almacenamiento local:', error);
            setIsLoading(false); // Asegúrate de marcar como cargado incluso si hay un error
        }
    }, [setBooks, setReadBooks, setAllBooks, setIsLoading]);

    // Guardar libros en el almacenamiento local cuando cambien
    useEffect(() => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
        } catch (error) {
            console.error('Error al guardar los libros en el almacenamiento local:', error);
        }
    }, [books]);

    // Guardar libros leídos en el almacenamiento local cuando cambien
    useEffect(() => {
        try {
            localStorage.setItem(LOCAL_STORAGE_READ_KEY, JSON.stringify(readBooks));
        } catch (error) {
            console.error('Error al guardar los libros leídos en el almacenamiento local:', error);
        }
    }, [readBooks]);

    return { books, readBooks };
};

export default useBookManagement;