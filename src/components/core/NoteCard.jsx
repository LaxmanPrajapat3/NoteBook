import { FiTrash2 } from 'react-icons/fi';

const NoteCard = ({ note, onDelete }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-5 flex flex-col justify-between transition-all hover:shadow-lg">
            <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{note.title}</h3>
                <p className="text-gray-600 text-sm">{note.description}</p>
            </div>
            <div className="flex justify-end mt-4">
                <button 
                    onClick={() => onDelete(note.id)} 
                    className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                    aria-label="Delete note"
                >
                    <FiTrash2 size={20} />
                </button>
            </div>
        </div>
    );
};

export default NoteCard;