import Logo from '../../assets/logo.svg';

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="max-w-md w-full mx-auto">
                <div className="flex justify-center mb-6">
                    <img src={Logo} alt="NoteApp Logo" className="h-12 w-auto" />
                </div>
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
                    <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-md space-y-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;