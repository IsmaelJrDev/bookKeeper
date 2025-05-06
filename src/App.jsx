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
    useBookManagement();

    return (
        <div className="container">
            <h1>BookKeeper</h1>
            <BookForm />
            <FilterBar />
            <div className="flex">
                <div className="flex-grow">
                    <BookList />
                </div>
                <div className="w-1-3">
                    <ReadBooks />
                </div>
            </div>
        </div>
    );
};

export default App;