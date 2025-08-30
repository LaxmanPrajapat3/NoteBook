const Input = ({ id, name, type = 'text', placeholder, value, onChange, error, ...props }) => {
    return (
        <div>
            <input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-3 rounded-lg bg-gray-100 border focus:bg-white focus:outline-none transition-all duration-300 ${error ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-indigo-500'}`}
                {...props}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default Input;