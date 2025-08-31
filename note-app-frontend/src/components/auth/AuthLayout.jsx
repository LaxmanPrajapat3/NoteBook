// import Logo from '../../assets/logo.svg';
import WaveBackground from '../../assets/wave-background.png'; // Import the new background image

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Left Column for Form */}
            <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col justify-center items-center p-4 md:p-8">
                <div className="max-w-md w-full mx-auto">
                    <div className="flex justify-center mb-6">
                        {/* <img src={Logo} alt="NoteApp Logo" className="h-10 w-auto" /> Adjusted logo size */}
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

            {/* Right Column for Background Image (hidden on small screens) */}
            <div 
                className="hidden md:flex md:w-1/2 lg:w-3/5 bg-cover bg-center"
                style={{ backgroundImage: `url(${WaveBackground})` }}
            >
                {/* Content can be added here if needed, like a tagline or logo */}
            </div>
            
        </div>
    );
};

export default AuthLayout;