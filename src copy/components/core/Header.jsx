import { useAuth } from '../../hooks/useAuth';
// import Logo from '../../assets/logo.svg';
import { FiLogOut } from 'react-icons/fi';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            {/* <img className="h-8 w-auto" src={Logo} alt="NoteApp" /> */}
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
                <img className="h-10 w-10 rounded-full" src={user?.picture} alt="User avatar" />
                <div className="hidden md:block">
                    <div className="text-sm font-medium text-gray-800">{user?.name}</div>
                    <div className="text-xs text-gray-500">{user?.email}</div>
                </div>
            </div>
            <button
              onClick={logout}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-label="Logout"
            >
              <FiLogOut className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;