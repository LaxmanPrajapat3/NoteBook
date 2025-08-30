import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';

import Header from '../components/core/Header';
import NoteCard from '../components/core/NoteCard';
import Spinner from '../components/core/Spinner';
import AddNoteModal from '../components/modals/AddNoteModal';

// Mock function to fetch notes
const fetchNotesApi = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { id: 1, title: 'Meeting Notes', description: 'Discussed Q3 goals and project timelines.' },
                { id: 2, title: 'Grocery List', description: 'Milk, Bread, Eggs, and Cheese.' },
                { id: 3, title: 'Book Ideas', description: 'A sci-fi novel about AI discovering art.' },
            ]);
        }, 1000);
    });
};

const Dashboard = () => {
    const { user } = useAuth();
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const getNotes = async () => {
            try {
                const notesData = await fetchNotesApi();
                setNotes(notesData);
            } catch (error) {
                toast.error('Failed to fetch notes.');
            } finally {
                setIsLoading(false);
            }
        };
        getNotes();
    }, []);

    const handleAddNote = (newNote) => {
        const noteWithId = { ...newNote, id: Date.now() }; // Simulate ID generation
        setNotes([noteWithId, ...notes]);
        toast.success('Note added successfully!');
        setIsModalOpen(false);
    };

    const handleDeleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
        toast.success('Note deleted!');
    };
    
    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome, {user?.name.split(' ')[0]}!</h1>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center justify-center bg-indigo-600 text-white font-semibold rounded-full px-4 py-2 shadow-lg hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <FiPlus className="h-5 w-5 mr-2" />
                            Add Note
                        </button>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-64"><Spinner /></div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {notes.length > 0 ? (
                                notes.map(note => (
                                    <NoteCard key={note.id} note={note} onDelete={handleDeleteNote} />
                                ))
                            ) : (
                                <p className="col-span-full text-center text-gray-500">You have no notes yet. Add one to get started!</p>
                            )}
                        </div>
                    )}
                </div>
            </main>
            <AddNoteModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddNote={handleAddNote}
            />
        </div>
    );
};

export default Dashboard;