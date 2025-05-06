import BookForm from './components/BookForm';
import BookList from './components/BookList';
import ReadBooks from './components/ReadBooks';
import FilterBar from './components/FilterBar';
import { BookProvider } from './context/BookContext';
import useBookManagement from './hooks/useBookManagement';

function App() {
    return (
        <BookProvider>
            <AppContent />
        </BookProvider>
    );
}

const AppContent = () => {
    // Llamamos al custom hook para cargar los datos desde localStorage
    useBookManagement();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">BookKeeper</h1>
            <BookForm />
            <FilterBar />
            <div className="flex space-x-4">
                <div className="flex-grow">
                    <BookList />
                </div>
                <div className="w-1/3">
                    <ReadBooks />
                </div>
            </div>
        </div>
    );
};

export default App;