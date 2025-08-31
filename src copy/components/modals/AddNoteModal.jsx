import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiX } from 'react-icons/fi';
import Button from '../core/Button';

const AddNoteModal = ({ isOpen, onClose, onAddNote }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        if (!title.trim() || !description.trim()) {
            toast.error('Both title and description are required.');
            return;
        }
        onAddNote({ title, description });
        setTitle('');
        setDescription('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                    <FiX size={24} />
                </button>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Add a New Note</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Note Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <textarea
                        placeholder="Note Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div className="mt-6">
                    <Button onClick={handleSubmit}>Add Note</Button>
                </div>
            </div>
        </div>
    );
};

export default AddNoteModal;